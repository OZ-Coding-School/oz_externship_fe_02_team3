import Button from '@src/components/button/Button'
import { ArrowLeft as ArrowLeftIcon, X as CloseIcon } from 'lucide-react'

interface ChatRoomHeaderProps {
  title: string
  onlineCount: number
  onBack: () => void
  onClose: () => void
}

export default function ChatRoomHeader({
  title,
  onlineCount,
  onBack,
  onClose,
}: ChatRoomHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 pt-3 pb-[13px]">
      <div className="flex gap-2">
        <Button
          icon={ArrowLeftIcon}
          variant="ghost"
          iconButtonSize="sm"
          iconSize="sm"
          iconClassName="stroke-gray-600"
          className="hover:bg-transparent active:bg-transparent"
          onClick={onBack}
          ariaLabel="이전으로"
        />
        <div>
          <h3 className="items-center text-sm font-semibold text-gray-900">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-green-500" />
            <p className="text-xs text-gray-600">{onlineCount}명 온라인</p>
          </div>
        </div>
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
