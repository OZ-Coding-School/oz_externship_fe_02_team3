import Button from '@src/components/commons/button/Button'
import { Send as SendIcon } from 'lucide-react'
import { useState } from 'react'
interface MessageInputProps {
  onSend: (message: string) => void
}
export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 border-t border-gray-200 px-3 pt-[13px] pb-3">
      <div className="flex w-full content-stretch items-center justify-start rounded-full border border-gray-300 bg-white px-[13px] py-[8px]">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="flex-1 text-sm outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div
        className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-300`}
      >
        <Button
          icon={SendIcon}
          variant="ghost"
          iconButtonSize="lg"
          iconSize="xs"
          iconClassName="stroke-white"
          className="hover:bg-transparent active:bg-transparent"
          onClick={handleSend}
          ariaLabel="메세지 보내기"
        />
      </div>
    </div>
  )
}
