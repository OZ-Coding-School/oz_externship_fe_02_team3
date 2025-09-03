import Button from '@components/Button'
import { ArrowLeft, X } from 'lucide-react'

interface ChatRoomHeaderProps {
  title: string
  onlineCount: number
  onBack: () => void
  onClose: () => void
}

const ChatRoomHeader = ({
  title,
  onlineCount,
  onBack,
  onClose,
}: ChatRoomHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 pt-3 pb-[13px]">
      <div className="flex gap-2">
        <Button
          icon={ArrowLeft}
          iconOnly
          variant="ghost"
          iconSize="xs"
          iconClassName="stroke-gray-600"
          className="px-2 py-2"
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
        icon={X}
        iconOnly
        variant="ghost"
        iconSize="sm"
        iconClassName="stroke-gray-400"
        onClick={onClose}
        ariaLabel="채팅창 닫기"
      />
    </div>
  )
}
export default ChatRoomHeader
