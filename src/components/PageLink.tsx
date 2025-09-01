import type { LucideIcon } from 'lucide-react'
import Icon from './Icon'

interface PageLinkProps {
  pageLinkInnerText: string
  icon: LucideIcon
  iconClassName?: string
  variant?: 'filled' | 'outline'
}

const PageLink = ({
  pageLinkInnerText,
  icon,
  iconClassName = '',
  variant = 'filled',
}: PageLinkProps) => {
  const linkStyles =
    variant === 'outline'
      ? 'border-1 border-primary-500 bg-transparent' // outline 스타일
      : 'bg-primary-500' // filled 스타일

  const textStyles =
    variant === 'outline'
      ? 'text-primary-500' //  outline일 때 텍스트 색상
      : 'text-white' // filled일 때 텍스트 색상
  return (
    <a
      href=""
      className={`bg-primary-500 flex w-fit items-center gap-2 rounded-lg px-6 py-2 transition-colors ${linkStyles}`}
    >
      <Icon
        icon={icon}
        size="sm"
        className={`${variant === 'outline' ? 'stroke-primary-500' : 'stroke-white'} ${iconClassName}`}
      />
      <span className={`text-base font-medium ${textStyles}`}>
        {pageLinkInnerText}
      </span>
    </a>
  )
}

export default PageLink
