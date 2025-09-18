import Message from './Message'
import type { ChatMessage } from '@src/types/chat'

interface MessageListProps {
  messages: ChatMessage[]
}

export default function MessageList({ messages }: MessageListProps) {
  // id: study_group_uuid : abcd-1234-efgh-5678-ijklmnopqrst

  const currentUserUuid = 'current-user-uuid'
  return (
    <div className="flex max-h-[217px] flex-col gap-3 overflow-y-auto p-3">
      {messages.map((message) => (
        <Message
          key={message.message_id}
          sender={message.sender.nickname}
          message={message.content}
          time={message.created_at}
          isOwn={message.sender.user_uuid === currentUserUuid}
        />
      ))}
    </div>
  )
}
