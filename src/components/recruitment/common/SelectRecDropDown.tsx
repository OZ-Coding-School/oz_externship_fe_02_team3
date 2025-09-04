import RecDropDown from '@src/components/recruitment/common/RecDropDown'
import { ChevronDown, Folder } from 'lucide-react'
import { useMemo, useState } from 'react'

const SORT_OPTION = ['최신순', '조회수 높은 순', '북마크 많은 순']
const STATUS_OPTION = ['전체 (4)', '모집중 (2)', '마감됨 (1)']

type Props = {
  variant: 'status' | 'sort'
}

const SelectRecDropDown = ({ variant }: Props) => {
  const options = useMemo(
    () => (variant === 'sort' ? SORT_OPTION : STATUS_OPTION),
    [variant]
  )

  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(options[0])

  return (
    <div className="relative w-full sm:max-w-[575px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
      >
        <RecDropDown
          dropdownTitle={selected}
          leftIcon={Folder}
          rightIcon={ChevronDown}
          rightIconClassName={`stroke-gray-600 transition-transform ${open ? 'rotate-180' : ''}`}
          className="h-10 w-full"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 left-0 z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === selected}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setSelected(option)
                setOpen(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectRecDropDown
