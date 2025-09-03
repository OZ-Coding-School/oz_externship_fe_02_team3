import type { Chat } from '@src/types/chat'
import { useState } from 'react'

import ChatList from './ChatList'

import ChatListHeader from './chatheader/ChatListHeader'
import ChatRoomHeader from './chatheader/ChatRoomHeader'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { ParticipantsList } from './ParticipantsList'

interface ChatProps {
  toggleChat: () => void
}
export default function Chatting({ toggleChat }: ChatProps) {
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list')
  const [selectedChatRoom, setSelectedChatRoom] = useState<Chat | null>(null)

  const openChatRoom = (chatData: Chat) => {
    setSelectedChatRoom(chatData)
    setCurrentView('chat')
  }

  const handleBack = () => {
    setCurrentView('list')
  }

  const sendMessage = (message: string) => {
    console.log(message)
  }

  const getOnlineCount = () => {
    if (!selectedChatRoom) return 0
    return selectedChatRoom.participants.filter((p) => p.status === 'online')
      .length
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
          title={selectedChatRoom.title}
          onlineCount={getOnlineCount()}
          onBack={handleBack}
          onClose={toggleChat}
        />
        <ParticipantsList participants={selectedChatRoom.participants} />
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={selectedChatRoom.messages} />
        </div>
        <MessageInput onSend={sendMessage} />
      </div>
    )

  return (
    <div className="fixed right-6 bottom-24 z-40 h-96 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl">
      {currentView === 'list' ? renderListView() : renderChatView()}
    </div>
  )
}
