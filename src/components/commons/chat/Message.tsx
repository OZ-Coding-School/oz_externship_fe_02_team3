import { cn } from '@utils/cn'
interface MessageProps {
  sender?: string
  message: string
  time: string
  isOwn: boolean
}

const formatMessageTime = (dateString: string) => {
  if (!dateString) return ''

  const messageDate = new Date(dateString)

  return messageDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function Message({
  sender,
  message,
  time,
  isOwn,
}: MessageProps) {
  const formattedTime = formatMessageTime(time)

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : sender !== '시스템' ? 'justify-start' : 'justify-center'} gap-1`}
    >
      <div className={cn('flex flex-col gap-1', isOwn ? 'items-end' : '')}>
        {!isOwn && sender !== '시스템' && <p className="text-xs">{sender}</p>}
        <div
          className={cn(
            'px-3 py-2',
            isOwn ? 'bg-primary-500' : 'bg-gray-100',
            isOwn
              ? 'rounded-tl-[8px] rounded-tr-[8px] rounded-br-[2px] rounded-bl-[8px]'
              : sender !== '시스템'
                ? 'rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[2px]'
                : 'rounded-[8px]'
          )}
        >
          <p className={`text-sm ${isOwn ? 'text-white' : 'text-gray-900'}`}>
            {message}
          </p>
        </div>
        {sender !== '시스템' && (
          <p className="text-xs text-gray-500">{formattedTime}</p>
        )}
      </div>
    </div>
  )
}
