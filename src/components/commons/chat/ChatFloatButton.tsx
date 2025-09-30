import Button from '@src/components/commons/button/Button'
import { cn } from '@utils/cn'
import Chat from '@components/commons/chat/Chatting'
import { MessageCircle as MessageIcon, X as CloseIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Z_INDEX } from '@src/constants/ui'

interface ChatFloatButtonProps {
  className?: string
}

export function ChatFloatButton({ className }: ChatFloatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const chatRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResetChat = () => {
      setIsOpen(false)
    }

    window.addEventListener('resetChatState', handleResetChat)
    return () => {
      window.removeEventListener('resetChatState', handleResetChat)
    }
  }, [])

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

  useEffect(() => {
    const studyGroupUuid = searchParams.get('study_group_uuid')
    if (studyGroupUuid) {
      setIsOpen(true)
    }
  }, [searchParams])

  return (
    <>
      <div
        ref={buttonRef}
        className={cn(
          `bg-primary-500 fixed right-6 bottom-6 cursor-pointer rounded-full shadow-lg ${Z_INDEX.BUTTON}`,
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
          <Chat setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      )}
    </>
  )
}

export default ChatFloatButton
