import { useHorizontalScroll } from '@src/hooks/useHorizontalScroll'
import type { Participant } from '@src/types/participants'
import { cn } from '@utils/cn'

interface ParticipantsListProps {
  participants: Participant[]
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  const { ref } = useHorizontalScroll()

  return (
    <div
      ref={ref}
      className="scrollbar-hide flex cursor-grab flex-nowrap items-center gap-2 overflow-x-auto border-b border-gray-200 bg-gray-50 px-2 pt-2 pb-[9px] active:cursor-grabbing"
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
