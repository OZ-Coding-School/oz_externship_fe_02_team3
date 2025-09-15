import type { Participant } from '@src/types/participants'
import { cn } from '@utils/cn'
import { useRef, useState } from 'react'

interface ParticipantsListProps {
  participants: Participant[]
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault()
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0))
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0)
    document.body.style.userSelect = 'none'
  }
  const onMouseLeave = () => {
    setIsDown(false)
    document.body.style.userSelect = ''
  }
  const onMouseUp = () => {
    setIsDown(false)
    document.body.style.userSelect = ''
  }
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    const walk = x - startX
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide flex cursor-grab flex-nowrap items-center gap-2 overflow-x-auto border-b border-gray-200 bg-gray-50 px-2 pt-2 pb-[9px] active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onWheel={onWheel}
    >
      {participants.map((participant, index) => (
        <div
          key={index}
          className="flex flex-shrink-0 items-center gap-1 rounded-full bg-white px-2 py-1"
        >
          <div
            className={cn(
              'size-2 rounded-full',
              participant.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
            )}
          />
          <span
            className={`text-xs ${
              index === 0 ? 'text-primary-600 font-semibold' : 'text-gray-700'
            }`}
          >
            {participant.name}
          </span>
        </div>
      ))}
    </div>
  )
}
