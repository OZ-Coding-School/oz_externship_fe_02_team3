import chatData from '@mock/chatData'
import type { Chat } from '@src/types/chat'
import ChatItem from './ChatItem'

interface ChatListProps {
  openChatRoom: (chatData: Chat) => void
}

export default function ChatList({ openChatRoom }: ChatListProps) {
  return (
    <div className="flex max-h-[310px] w-[318px] flex-col divide-y divide-gray-200 overflow-y-auto">
      {chatData.map((data) => (
        <ChatItem key={data.id} openChatRoom={openChatRoom} {...data} />
      ))}
    </div>
  )
}
