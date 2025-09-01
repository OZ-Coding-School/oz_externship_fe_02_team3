import type { LucideIcon } from 'lucide-react'

interface DropDownProps {
  dropdownTitle: string
  leftIcon: LucideIcon
  rightIcon: LucideIcon
}

const DropDown = ({
  dropdownTitle,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}: DropDownProps) => {
  return (
    <div className="relative flex h-[38px] w-[378px] items-center justify-center">
      <LeftIcon className="absolute top-0 left-0 flex h-full items-center justify-center pl-[12px]" />
      <div className="flex w-full items-start justify-start rounded-[8px] border border-solid border-gray-300 bg-white py-[9px] pr-[33px] pl-[41px]">
        <div className="flex justify-center font-['Roboto:Regular',_'Noto_Sans_KR:Regular',_sans-serif] text-[14px] leading-[0] font-normal text-nowrap text-black">
          <p className="leading-[20px] whitespace-pre">{dropdownTitle}</p>
        </div>
      </div>
      <RightIcon className="absolute top-0 right-0 flex h-full items-center justify-start pr-[12px]" />
    </div>
  )
}

export default DropDown
