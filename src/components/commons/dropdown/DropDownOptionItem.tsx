import { cn } from '@utils/cn'

interface DropDownOptionItemProps {
  option: string
  selected?: string
  onSelect?: (value: string) => void
  setIsOpen: (isOpen: boolean) => void
}

export default function DropDownOptionItem({
  option,
  selected,
  onSelect,
  setIsOpen,
}: DropDownOptionItemProps) {
  const handleSelect = (option: string) => {
    onSelect?.(option)
    setIsOpen(false)
  }
  return (
    <button
      type="button"
      onClick={() => handleSelect(option)}
      className={cn(
        'w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50',
        option === selected && 'bg-primary-50 text-primary-600'
      )}
    >
      {option}
    </button>
  )
}
