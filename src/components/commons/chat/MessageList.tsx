import { useEffect, useRef } from 'react'
import Message from './Message'
import type { ChatMessage } from '@src/types/chat'

interface MessageListProps {
  messages: ChatMessage[]
  currentUserUuid: string
}

export default function MessageList({
  messages,
  currentUserUuid,
}: MessageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])
  return (
    <div
      className="flex max-h-[217px] flex-col gap-3 overflow-y-auto p-3"
      ref={scrollContainerRef}
    >
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
