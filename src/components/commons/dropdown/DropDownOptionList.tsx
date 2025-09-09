import { cn } from '@utils/cn'
import DropDownOptionItem from './DropDownOptionItem'

interface DropDownOptionsProps {
  className?: string
  options: string[]
  onSelect?: (value: string) => void
  selected?: string
  setIsOpen: (isOpen: boolean) => void
}
export default function DropDownOptionList({
  className,
  options,
  onSelect,
  selected,
  setIsOpen,
}: DropDownOptionsProps) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg',
        className
      )}
    >
      {options.map((option, i) => (
        <DropDownOptionItem
          key={i}
          option={option}
          selected={selected}
          onSelect={onSelect}
          setIsOpen={setIsOpen}
        />
      ))}
    </div>
  )
}
