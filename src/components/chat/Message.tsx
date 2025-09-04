interface MessageProps {
  sender?: string
  message: string
  time: string
  isOwn: boolean
}

export default function Message({
  sender,
  message,
  time,
  isOwn,
}: MessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} gap-1`}>
      <div className="flex flex-col gap-1">
        {!isOwn && sender && <p className="text-xs">{sender}</p>}
        <div
          className={`${isOwn ? 'bg-primary-500' : 'bg-gray-100'} px-3 py-2 ${
            isOwn
              ? 'rounded-tl-[8px] rounded-tr-[8px] rounded-br-[2px] rounded-bl-[8px]'
              : 'rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[2px]'
          }`}
        >
          <p className={`text-sm ${isOwn ? 'text-white' : 'text-gray-900'}`}>
            {message}
          </p>
        </div>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}
