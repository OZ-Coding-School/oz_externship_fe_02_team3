import type { Chat } from '@src/types/chat'
import { useEffect, useState, useCallback, useRef } from 'react'

import ChatList from './ChatList'

import ChatListHeader from './chat-header/ChatListHeader'
import ChatRoomHeader from './chat-header/ChatRoomHeader'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import ParticipantsList from './ParticipantsList'
import { useChatMessages } from '@src/hooks/useChatting'
import { participants } from '@src/mock/participants'
import { useSearchParams } from 'react-router-dom'
import { chatList } from '@src/mock/chatListData'
import { Z_INDEX } from '@src/constants/ui'
import { useAuth } from '@src/store/auth'

interface ChatProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface WebSocketMessage {
  message_id: number
  sender: {
    user_uuid: string
    nickname: string
    profile_img_url: string
  }
  content: string
  created_at: string
  type?: 'message' | 'user_joined'
}

export default function Chatting({ isOpen, setIsOpen }: ChatProps) {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [realTimeMessages, setRealTimeMessages] = useState<WebSocketMessage[]>(
    []
  )
  const socketRef = useRef<WebSocket | null>(null)
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list')
  const [selectedChatRoom, setSelectedChatRoom] = useState<Chat | null>(null)
  const studyGroupUuid = searchParams.get('study_group_uuid')
  const { chatMessages, isLoading: isMessagesLoading } = useChatMessages(
    selectedChatRoom?.uuid
  )

  const openChatRoom = (chatData: Chat) => {
    setSelectedChatRoom(chatData)
    setCurrentView('chat')
  }

  const connectWebSocket = useCallback(() => {
    if (
      !selectedChatRoom?.uuid ||
      socketRef.current?.readyState === WebSocket.OPEN
    )
      return

    const token = localStorage.getItem('access_token')
    if (!token) return

    const wsUrl = `ws://api.ozcoding.site/ws/chat/${selectedChatRoom.uuid}/?token=${token}`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      const currentUserNickname = user?.name || '사용자'
      socketRef.current = ws
      const joinMessage: WebSocketMessage = {
        message_id: Date.now(),
        sender: {
          user_uuid: 'system',
          nickname: '시스템',
          profile_img_url: '',
        },
        content: `${currentUserNickname}님이 입장했습니다!`,
        created_at: new Date().toISOString(),
        type: 'user_joined',
      }
      setRealTimeMessages((prev) => [...prev, joinMessage])
    }

    ws.onmessage = (event) => {
      if (typeof event.data !== 'string') return
      const message = JSON.parse(event.data)

      if (message.type === 'chat_message') {
        const newMessage: WebSocketMessage = {
          message_id: message.data.message_id,
          sender: {
            user_uuid: message.data.sender.user_uuid,
            nickname: message.data.sender.nickname,
            profile_img_url: message.data.sender.profile_img_url || '',
          },
          content: message.data.content,
          created_at: message.data.created_at,
          type: 'message',
        }
        if (newMessage.sender.nickname !== user?.name) {
          setRealTimeMessages((prev) => [...prev, newMessage])
        }
      } else if (message.type === 'user_event') {
        const { event, nickname } = message.data
        const content =
          event === 'join'
            ? `${nickname}님이 입장했습니다.`
            : event === 'leave'
              ? `${nickname}님이 퇴장했습니다.`
              : ''

        if (content) {
          const userEventMessage: WebSocketMessage = {
            message_id: Date.now(),
            sender: {
              user_uuid: 'system',
              nickname: '시스템',
              profile_img_url: '',
            },
            content,
            created_at: new Date().toISOString(),
            type: 'user_joined',
          }
          setRealTimeMessages((prev) => [...prev, userEventMessage])
        }
      }
    }

    ws.onclose = () => {
      socketRef.current = null
    }
  }, [selectedChatRoom, user])

  const sendMessage = (content: string) => {
    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN ||
      !content.trim() ||
      !selectedChatRoom?.uuid
    ) {
      return false
    }

    const myMessage: WebSocketMessage = {
      message_id: Date.now(),
      sender: {
        user_uuid: String(user?.id || ''),
        nickname: user?.name || '현재사용자',
        profile_img_url: '',
      },
      content: content.trim(),
      created_at: new Date().toISOString(),
      type: 'message',
    }
    setRealTimeMessages((prev) => [...prev, myMessage])

    const message = {
      type: 'send_message',
      data: {
        content: content.trim(),
      },
    }
    socketRef.current.send(JSON.stringify(message))
    return true
  }

  const disconnectWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close(1000, 'User disconnected')
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    if (currentView === 'chat' && selectedChatRoom) {
      setRealTimeMessages([])
      connectWebSocket()
    } else {
      disconnectWebSocket()
    }

    return () => {
      disconnectWebSocket()
    }
  }, [currentView, selectedChatRoom, connectWebSocket, disconnectWebSocket])

  const handleBack = () => {
    setCurrentView('list')
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const renderListView = () => (
    <>
      <ChatListHeader unreadCount={3} onClose={toggleChat} />
      <ChatList openChatRoom={openChatRoom} />
    </>
  )

  const renderChatView = () =>
    selectedChatRoom && (
      <div className="flex h-full flex-col">
        <ChatRoomHeader
          title={selectedChatRoom.name}
          // onlineCount={getOnlineCount()}
          onBack={handleBack}
          toggleChat={toggleChat}
        />
        <ParticipantsList participants={participants} />
        <div className="flex-1">
          {isMessagesLoading ? (
            <div className="flex h-full items-center justify-center">
              <div>메시지를 불러오는 중...</div>
            </div>
          ) : (
            <MessageList
              messages={[...chatMessages, ...realTimeMessages]}
              currentUserUuid={String(user?.id || '')}
            />
          )}
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    )

  useEffect(() => {
    if (!studyGroupUuid) {
      return
    }

    const targetChatRoom = chatList.find((chat) => chat.uuid === studyGroupUuid)
    if (targetChatRoom) {
      setIsOpen(true)
      openChatRoom(targetChatRoom)
    }
  }, [studyGroupUuid, setIsOpen])

  return (
    <div
      className={`fixed right-6 bottom-24 h-96 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl ${Z_INDEX.MODAL}`}
    >
      {currentView === 'list' ? renderListView() : renderChatView()}
    </div>
  )
}
