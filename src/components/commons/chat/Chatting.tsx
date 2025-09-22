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
  type?: 'message' | 'user_joined' | 'user_left' | 'typing' | 'system'
}

const generateUserUuid = () =>
  `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export default function Chatting({ isOpen, setIsOpen }: ChatProps) {
  const [searchParams] = useSearchParams()

  // 기존 state들 아래에 WebSocket 관련 state 추가
  const [realTimeMessages, setRealTimeMessages] = useState<WebSocketMessage[]>(
    []
  )
  // cleanup 함수에서 WebSocket 연결 해제할 때 사용
  const socketRef = useRef<WebSocket | null>(null)

  // 탭별 고유 user_uuid 생성 (컴포넌트 생명주기 동안 유지)
  const currentUserUuid = useRef(generateUserUuid()).current

  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list')
  const [selectedChatRoom, setSelectedChatRoom] = useState<Chat | null>(null)
  const studyGroupUuid = searchParams.get('study_group_uuid')
  const { chatMessages, isLoading: isMessagesLoading } = useChatMessages(
    selectedChatRoom?.study_group_uuid
  )

  // 1. 채팅방 입장 함수
  const openChatRoom = (chatData: Chat) => {
    // 선택된 채팅방을 상태에 저장 (이 값이 변경되면 connectWebSocket이 재실행됨)
    setSelectedChatRoom(chatData)
    setCurrentView('chat')
  }

  // 3. selectedChatRoom이 변경될 때만 함수가 재생성됨
  const connectWebSocket = useCallback(() => {
    // 조건 검사 1: 선택된 채팅방이 없거나 채팅방 UUID가 없으면 연결하지 않음
    if (!selectedChatRoom?.study_group_uuid) return

    // 조건 검사 2: 이미 WebSocket이 열린 상태(OPEN)라면 중복 연결 방지
    // WebSocket.OPEN은 상수값 1을 의미
    if (socketRef.current?.readyState === WebSocket.OPEN) return

    // 개발자 콘솔에 연결 시도 로그 출력
    console.log('WebSocket 연결 시도...')
    // UI에 연결 시도 중 상태 표시
    // setConnectionStatus('connecting')

    // MSW가 가로챌 수 있는 WebSocket URL 생성
    // 실제 서버: ws://서버주소/ws/chat/채팅방UUID/?token=토큰
    // MSW 테스트: ws://localhost:3000/ws/chat/채팅방UUID
    // const wsUrl = `wss://echo.websocket.org`
    // const wsUrl = `ws://localhost:3000/ws/chat/${selectedChatRoom.study_group_uuid}`
    // const wsUrl = `ws://localhost:5173/test`
    const wsUrl = `ws://localhost:5173/ws/chat/${selectedChatRoom.study_group_uuid}`
    const ws = new WebSocket(wsUrl)

    // WebSocket 연결이 성공적으로 완료되었을 때 실행되는 이벤트 핸들러
    ws.onopen = () => {
      console.log('WebSocket 연결 성공')
      // UI에 연결 완료 상태 표시
      // setConnectionStatus('connected') // ← 상태 변경
      // setSocket(ws) // ← 상태 변경
      socketRef.current = ws // ← useRef 값 설정

      const joinMessage = {
        type: 'join',
        room_id: selectedChatRoom.study_group_uuid,
        user_uuid: currentUserUuid,
        nickname: '현재사용자',
      }
      console.log('방 입장 메시지 전송:', joinMessage)
      ws.send(JSON.stringify(joinMessage))
    }

    // 서버(MSW)로부터 메시지를 받았을 때 실행되는 이벤트 핸들러
    ws.onmessage = (event) => {
      console.log('[APP][WS] 수신 raw:', event.data)

      try {
        if (typeof event.data !== 'string') return
        // event.data는 서버에서 보낸 메시지 문자열
        const data = JSON.parse(event.data)
        // JSON.parse()로 문자열을 WebSocketMessage 객체로 변환
        // 내가 보낸 메시지는 이미 UI에 추가했으므로 무시
        if (data.sender?.user_uuid === currentUserUuid) {
          return
        }
        const convertedMessage: WebSocketMessage = {
          message_id: Date.now(),
          sender: {
            user_uuid: data.user_uuid ?? 'server',
            nickname: data.sender?.nickname ?? 'Unknown',
            profile_img_url: '',
          },
          content: data.content ?? '',
          created_at: data.created_at ?? new Date().toISOString(),
          type: data.type === 'system' ? 'system' : 'message',
        }

        // 파싱된 메시지를 realTimeMessages 상태 배열에 추가
        // prev => [...prev, message]: 기존 배열을 복사하고 새 메시지를 맨 끝에 추가
        // 이렇게 하면 React가 상태 변경을 감지하고 UI를 업데이트함
        setRealTimeMessages((prev) => [...prev, convertedMessage]) // ← 상태에 추가
      } catch (error) {
        console.log('JSON 파싱 실패, Echo 서버 응답 처리:', event.data)
      }
    }

    // WebSocket 연결이 종료되었을 때 실행되는 이벤트 핸들러
    // 정상 종료(사용자가 의도적으로 끊음)와 비정상 종료(네트워크 문제) 모두 여기서 처리
    ws.onclose = (event) => {
      // event.code: 연결 종료 이유 코드 (1000=정상종료, 1006=비정상종료 등)
      console.log('WebSocket 연결 종료됨, code:', event.code)
      // UI에 연결 해제 상태 표시
      // setConnectionStatus('disconnected')
      // React state에서 WebSocket 객체 제거
      // setSocket(null)
      // useRef에서도 WebSocket 객체 제거
      socketRef.current = null
    }
  }, [selectedChatRoom, currentUserUuid])

  // 4. 사용자가 메시지를 보낼 때 호출되는 함수
  const sendMessage = (content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN && content.trim()) {
      // 방 정보 없으면 전송하지 않음(안전 가드)
      if (!selectedChatRoom?.study_group_uuid) {
        console.warn('[APP][WS] room_id 없음: 전송 취소')
        return false
      }

      const message = {
        type: 'message',
        room_id: selectedChatRoom.study_group_uuid,
        content: content.trim(),
        user_uuid: currentUserUuid,
        nickname: '현재사용자',
      }

      console.log('메시지 전송:', message)
      const myMessage: WebSocketMessage = {
        message_id: Date.now(),
        sender: {
          user_uuid: currentUserUuid,
          nickname: '현재사용자',
          profile_img_url: '',
        },
        content: content.trim(),
        created_at: new Date().toISOString(),
        type: 'message',
      }
      setRealTimeMessages((prev) => [...prev, myMessage])
      socketRef.current.send(JSON.stringify(message)) // ← MSW로 메시지 전송
      return true
    }
    return false
  }

  // WebSocket 연결을 해제하는 함수 (useCallback으로 메모화)
  // 의존성 배열이 비어있음 = 컴포넌트 생명주기 동안 함수가 한 번만 생성됨
  const disconnectWebSocket = useCallback(() => {
    // 현재 WebSocket 연결이 존재하는지 확인
    if (socketRef.current) {
      // 개발자 콘솔에 연결 해제 시도 로그 출력
      console.log('WebSocket 연결 해제 중...')
      // WebSocket 연결을 정상적으로 종료 (code: 1000 = 정상 종료)
      socketRef.current.close(1000, 'User disconnected')
      // useRef에서 WebSocket 객체 제거
      socketRef.current = null
      // React state에서 WebSocket 객체 제거
      // setSocket(null)
      // UI에 연결 해제 상태 표시
      // setConnectionStatus('disconnected')
    }
  }, []) // 빈 의존성 배열: 함수가 한 번만 생성되고 재사용됨

  // 2. 화면 전환과 채팅방 선택에 따른 WebSocket 연결/해제를 담당
  // 의존성: currentView, selectedChatRoom, connectWebSocket, disconnectWebSocket
  // 이 값들 중 하나라도 변경되면 useEffect 내부 코드가 재실행됨
  useEffect(() => {
    // 조건: 현재 채팅방 뷰이고 + 선택된 채팅방이 존재하는 경우
    if (currentView === 'chat' && selectedChatRoom) {
      // 채팅방 입장 시: 이전 실시간 메시지 배열을 비움 (새로운 채팅방의 메시지만 표시)
      // 이전 채팅방의 실시간 메시지가 새로운 채팅방에 섞여서 표시되는 것을 방지하기 위함
      setRealTimeMessages([])
      // WebSocket 연결 시도
      connectWebSocket()
    } else {
      // 채팅방 목록 뷰이거나 선택된 채팅방이 없는 경우: WebSocket 연결 해제
      disconnectWebSocket()
    }

    // cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경되기 전에 실행
    // 메모리 누수 방지를 위해 WebSocket 연결을 정리
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
          title={selectedChatRoom.study_group_name}
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
              currentUserUuid={currentUserUuid}
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

    const targetChatRoom = chatList.find(
      (chat) => chat.study_group_uuid === studyGroupUuid
    )
    if (targetChatRoom) {
      setIsOpen(true) // 채팅창을 열어줌
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
