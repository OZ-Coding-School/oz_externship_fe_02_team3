import Button from '@components/Button'
import Chat from '@src/components/Chat/Chatting'
import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ChatFloatButtonProps {
  className?: string
}

export function ChatFloatButton({ className }: ChatFloatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div
        ref={buttonRef}
        className={`fixed right-6 bottom-6 z-50 ${className} bg-primary-500 flex size-16 cursor-pointer items-center justify-center rounded-full shadow-lg`}
      >
        {!isOpen ? (
          <Button
            icon={MessageCircle}
            iconOnly
            variant="ghost"
            iconSize="lg"
            iconClassName="stroke-white"
            onClick={toggleChat}
            ariaLabel="채팅창 열기"
          />
        ) : (
          <Button
            icon={X}
            iconOnly
            variant="ghost"
            iconSize="sm"
            iconClassName="stroke-gray-400"
            onClick={toggleChat}
            ariaLabel="채팅창 닫기"
          />
        )}
      </div>
      {isOpen && (
        <div ref={chatRef}>
          <Chat toggleChat={toggleChat} />
        </div>
      )}
    </>
  )
}

export default ChatFloatButton
