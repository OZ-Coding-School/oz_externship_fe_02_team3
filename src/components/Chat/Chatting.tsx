import type { Chat } from '@src/types/chat'
import { useState } from 'react'

import ChatList from './ChatList'

import ChatListHeader from './ChatHeader/ChatListHeader'
import ChatRoomHeader from './ChatHeader/ChatRoomHeader'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { ParticipantsList } from './ParticipantsList'

interface ChatProps {
  toggleChat: () => void
}
const Chatting = ({ toggleChat }: ChatProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list')
  const [selectedChatRoom, setSelectedChatRoom] = useState<Chat | null>(null)

  const openChatRoom = (chatData: Chat) => {
    setSelectedChatRoom(chatData)
    setCurrentView('chat')
  }

  const handleBack = () => {
    setCurrentView('list')
  }

  const sendMessage = (message: string) => {}

  const getOnlineCount = () => {
    if (!selectedChatRoom) return 0
    return selectedChatRoom.participants.filter((p) => p.status === 'online')
      .length
  }

  return (
    <div className="fixed right-6 bottom-24 z-40 max-h-96 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl">
      <div className="flex flex-col">
        {currentView === 'list' ? (
          <>
            <ChatListHeader unreadCount={3} onClose={toggleChat} />
            <ChatList openChatRoom={openChatRoom} />
          </>
        ) : (
          selectedChatRoom && (
            <>
              <ChatRoomHeader
                title={selectedChatRoom.title}
                onlineCount={getOnlineCount()}
                onBack={handleBack}
                onClose={toggleChat}
              />
              <ParticipantsList participants={selectedChatRoom.participants} />
              <MessageList messages={selectedChatRoom.messages} />
              <MessageInput onSend={sendMessage} />
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Chatting
