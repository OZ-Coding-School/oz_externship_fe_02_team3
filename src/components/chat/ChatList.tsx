import chatData from '@mock/chatData'
import type { Chat } from '@src/types/chat'

interface ChatListProps {
  openChatRoom: (chatData: Chat) => void
}

export default function ChatList({ openChatRoom }: ChatListProps) {
  return (
    <div className="flex max-h-[310px] w-[318px] flex-col divide-y divide-gray-200 overflow-y-auto">
      {chatData.map((data) => (
        <div
          key={data.id}
          className="flex cursor-pointer flex-col gap-1 p-3"
          onClick={() => openChatRoom(data)}
        >
          <div className="flex justify-between">
            <h4 className="text-sm text-gray-900">{data.title}</h4>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{data.date}</span>
              {data.unreadCount && (
                <div className="bg-danger-500 flex size-5 items-center justify-center rounded-full">
                  <p className="text-xs font-medium text-white">
                    {data.unreadCount}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">
              {data.lastMessage.sender}:
            </span>
            <p className="line-clamp-1 flex-1 text-xs text-gray-600">
              {data.lastMessage.content}
            </p>
          </div>
          <p className="text-xs text-gray-400">수정일시: {data.modifiedAt}</p>
        </div>
      ))}
    </div>
  )
}
