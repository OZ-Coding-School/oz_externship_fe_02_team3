import Button from '@src/components/commons/button/Button'
import { Send as SendIcon } from 'lucide-react'
import { useState } from 'react'

interface MessageInputProps {
  onSendMessage?: (message: string) => boolean
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setMessage(newValue)
    console.log('현재 입력값:', newValue)
  }
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('메시지 전송:', message)

    // onSendMessage prop이 있으면 호출
    if (onSendMessage && message.trim()) {
      const success = onSendMessage(message.trim())
      if (success) {
        setMessage('') // 전송 성공시 입력창 비우기
      }
    }
  }
  return (
    <form
      className="flex items-center justify-between gap-2 border-t border-gray-200 px-3 pt-[13px] pb-3"
      onSubmit={sendMessage}
    >
      <div className="flex w-full content-stretch items-center justify-start rounded-full border border-gray-300 bg-white px-[13px] py-[8px]">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="flex-1 text-sm outline-none"
          value={message}
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-300`}
      >
        <Button
          type="submit"
          icon={SendIcon}
          variant="ghost"
          iconButtonSize="lg"
          iconSize="xs"
          iconClassName="stroke-white"
          className="hover:bg-transparent active:bg-transparent"
          ariaLabel="메세지 보내기"
        />
      </div>
    </form>
  )
}
