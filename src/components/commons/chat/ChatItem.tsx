import type { Chat } from '@src/types/chat'

interface ChatItemProps extends Chat {
  openChatRoom: (chatData: Chat) => void
}
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''

  const serverDate = new Date(dateString)
  const now = new Date()

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const diffMs = now.getTime() - serverDate.getTime() // 밀리초 차이
  const hours = Math.floor(diffMs / (60 * 60 * 1000))
  const minutes = Math.floor(diffMs / 60000)

  if (serverDate >= startOfYesterday && serverDate < startOfToday) {
    return '어제'
  } else if (minutes < 1) {
    return '방금 전'
  } else if (minutes < 60) {
    return `${minutes}분 전`
  } else if (hours < 24) {
    return `${hours}시간 전`
  } else {
    return serverDate.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    })
  }
}

export default function ChatItem({ openChatRoom, ...data }: ChatItemProps) {
  return (
    <div
      className="flex cursor-pointer flex-col gap-1 p-3"
      onClick={() => openChatRoom(data)}
    >
      <div className="flex justify-between">
        <h4 className="text-sm text-gray-900">{data.study_group_name}</h4>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{formatDate(data.last_message?.created_at)}</span>
          {data.unread_count > 0 && (
            <div className="bg-danger-500 flex size-5 items-center justify-center rounded-full">
              <p className="text-xs font-medium text-white">
                {data.unread_count  > 99 ? '99+' : data.unread_count}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-600">
          {data.last_message?.sender_nickname}:
        </span>
        <p className="line-clamp-1 flex-1 text-xs text-gray-600">
          {data.last_message?.content}
        </p>
      </div>
      <p className="text-xs text-gray-400">수정일시: {data.last_message?.created_at}</p>
    </div>
  )
}
