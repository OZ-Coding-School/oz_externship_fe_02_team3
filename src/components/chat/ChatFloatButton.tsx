import Button from '@src/components/button/Button'
import { cn } from '@utils/cn'
import Chat from '@src/components/chat/Chatting'
import { MessageCircle as MessageIcon, X as CloseIcon } from 'lucide-react'
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
        className={cn(
          'bg-primary-500 fixed right-6 bottom-6 z-50 cursor-pointer rounded-full shadow-lg',
          className
        )}
      >
        <Button
          icon={isOpen ? CloseIcon : MessageIcon}
          variant="ghost"
          iconClassName="stroke-white"
          iconButtonSize="xl"
          iconSize="lg"
          className="hover:bg-transparent active:bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={`채팅창 ${isOpen ? '닫기' : '열기'}`}
        />
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
