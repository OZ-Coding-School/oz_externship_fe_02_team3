import type { LucideIcon } from 'lucide-react'
import Icon from './Icon'

interface DropDownProps {
  dropdownTitle: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftIconClassName?: string
  rightIconClassName?: string
}

const DropDown = ({
  dropdownTitle,
  leftIcon,
  rightIcon,
  leftIconClassName = '',
  rightIconClassName = '',
}: DropDownProps) => {
  return (
    <div className="relative flex h-[38px] w-[378px] items-center rounded-lg border border-gray-300">
      {/* {leftIcon && (  <LeftIcon className="absolute top-0 left-0 flex h-full items-center justify-center pl-[12px]" />)} */}
      {leftIcon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <Icon
            icon={leftIcon}
            size="sm" // ✅ 이제 작동함
            className={`stroke-gray-400 ${leftIconClassName}`}
          />
        </div>
      )}

      {/* <div className="flex w-full items-start justify-start rounded-[8px] border border-solid border-gray-300 bg-white py-[9px] pr-[33px] pl-[41px]"> */}
      {/* <div className="flex justify-center text-[14px] leading-[0] font-normal text-nowrap text-black"> */}
      <p className="pl-10 text-sm">{dropdownTitle}</p>
      {/* </div> */}
      {/* </div> */}
      {rightIcon && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Icon
            icon={rightIcon}
            size="sm" // ✅ 이제 작동함
            className={`stroke-gray-400 ${rightIconClassName}`}
          />
        </div>
      )}
      {/* <RightIcon className="absolute top-0 right-0 flex h-full items-center justify-start pr-[12px]" /> */}
    </div>
  )
}

export default DropDown
