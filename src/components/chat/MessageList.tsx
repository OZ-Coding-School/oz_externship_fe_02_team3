import Message from './Message'

interface MessageData {
  id: number
  sender: string
  message: string
  time: string
  isOwn: boolean
}

interface MessageListProps {
  messages: MessageData[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex max-h-[217px] flex-col gap-3 overflow-y-auto p-3">
      {messages.map((message) => (
        <Message
          key={message.id}
          sender={message.sender}
          message={message.message}
          time={message.time}
          isOwn={message.isOwn}
        />
      ))}
    </div>
  )
}
