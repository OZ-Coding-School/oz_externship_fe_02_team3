import Button from '@components/Button'
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
        className={`fixed right-6 bottom-6 z-50 ${className} bg-primary-500 flex size-16 cursor-pointer items-center justify-center rounded-full shadow-lg`}
      >
        <Button
          icon={isOpen ? CloseIcon : MessageIcon}
          iconOnly
          variant="ghost"
          iconSize={'lg'}
          iconClassName={'stroke-white'}
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
