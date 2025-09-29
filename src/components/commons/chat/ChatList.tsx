// import chatData from '@src/mock/chatListData'
import type { Chat } from '@src/types/chat'
import ChatItem from './ChatItem'
import { useChatting } from '@src/hooks/useChatting'

interface ChatListProps {
  openChatRoom: (chatData: Chat) => void
}

export default function ChatList({ openChatRoom }: ChatListProps) {
  const { chatList } = useChatting()
  return (
    <div className="flex max-h-[310px] w-[318px] flex-col divide-y divide-gray-200 overflow-y-auto">
      {chatList.map((data) => (
        <ChatItem key={data.uuid} openChatRoom={openChatRoom} {...data} />
      ))}
    </div>
  )
}
