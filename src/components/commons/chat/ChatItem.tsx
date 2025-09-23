import type { Chat } from '@src/types/chat'

interface ChatItemProps extends Chat {
  openChatRoom: (chatData: Chat) => void
}
const formatDate = (dateString: string | undefined, id: string) => {
  if (!dateString) return ''

  const serverDate = new Date(dateString)

  // 공통으로 사용할 값들
  const year = serverDate.getFullYear()
  const month = String(serverDate.getMonth() + 1).padStart(2, '0')
  const monthNoZero = String(serverDate.getMonth() + 1)
  const day = String(serverDate.getDate()).padStart(2, '0')
  const dayNoZero = String(serverDate.getDate() + 1)
  const hours = String(serverDate.getHours()).padStart(2, '0')
  const minutes = String(serverDate.getMinutes()).padStart(2, '0')

  // id에 따라 다른 형식 반환
  if (id === 'createdAt') {
    return `${monthNoZero}월 ${dayNoZero}일` // 월-일만
  } else if (id === 'lastMessageAt') {
    return `${year}-${month}-${day} ${hours}:${minutes}` // 전체 날짜시간
  }

  // 기본값 (필요시)
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export default function ChatItem({ openChatRoom, ...data }: ChatItemProps) {
  const createdAt = formatDate(data.created_at, 'createdAt')
  const lastMessageAt = formatDate(
    data.last_message?.created_at,
    'lastMessageAt'
  )
  console.log(data)

  return (
    <div
      className="flex cursor-pointer flex-col gap-1 p-3"
      onClick={() => openChatRoom(data)}
    >
      <div className="flex justify-between">
        <h4 className="text-sm text-gray-900">{data.study_group_name}</h4>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{createdAt}</span>
          {data.unread_count > 0 && (
            <div className="bg-danger-500 flex size-5 items-center justify-center rounded-full">
              <p className="text-xs font-medium text-white">
                {data.unread_count > 99 ? '99+' : data.unread_count}
              </p>
            </div>
          )}
        </div>
      </div>

      {data.last_message ? (
        <>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">
              {data.last_message?.sender_nickname}:
            </span>
            <p className="line-clamp-1 flex-1 text-xs text-gray-600">
              {data.last_message?.content}
            </p>
          </div>
          <p className="text-xs text-gray-400">수정일시: {lastMessageAt}</p>
        </>
      ) : (
        <span className="text-xs text-gray-600">
          (대화가 없습니다. 대화를 시작해보세요.)
        </span>
      )}
    </div>
  )
}
