import { cn } from '@utils/cn'
import DropDownOptionItem from './DropDownOptionItem'

interface DropDownOption {
  id: number
  name: string
}

interface DropDownOptionsProps {
  className?: string
  options: DropDownOption[]
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
        'scroll-hide absolute top-full left-0 z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg',
        className
      )}
    >
      {options.map((option, i) => (
        <DropDownOptionItem
          key={i}
          option={option.name}
          selected={selected}
          onSelect={onSelect}
          setIsOpen={setIsOpen}
        />
      ))}
    </div>
  )
}
