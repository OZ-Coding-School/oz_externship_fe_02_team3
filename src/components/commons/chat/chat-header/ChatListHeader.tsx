import Button from '@src/components/commons/button/Button'
import { X as CloseIcon } from 'lucide-react'

interface ChatListHeaderProps {
  unreadCount: number
  onClose: () => void
}

export default function ChatListHeader({
  unreadCount,
  onClose,
}: ChatListHeaderProps) {
  
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 pt-4 pb-[17px]">
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-gray-900">채팅방</h3>
        <p className="text-primary-600 text-xs">
          {unreadCount}개의 읽지 않은 메시지
        </p>
      </div>
      <Button
        icon={CloseIcon}
        variant="ghost"
        iconButtonSize="sm"
        iconSize="sm"
        iconClassName="stroke-gray-400"
        className="hover:bg-transparent active:bg-transparent"
        onClick={onClose}
        ariaLabel="채팅창 닫기"
      />
    </div>
  )
}
