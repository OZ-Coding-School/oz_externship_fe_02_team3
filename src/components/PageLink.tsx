import Icon from '@components/Icon'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
interface PageLinkProps {
  pageLinkInnerText: string
  icon?: LucideIcon
  iconClassName?: string
  variant?: 'filled' | 'outline' | 'ghost'
  bgColor?: string
  borderColor?: string
  textColor?: string
  hoverBgColor?: string
  hoverTextColor?: string
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  linkTo: string
}

const PageLink = ({
  pageLinkInnerText,
  icon,
  iconClassName = '',
  variant = 'ghost',
  bgColor = 'bg-primary-500',
  borderColor = 'border-primary-500',
  textColor = 'text-gray-700',
  hoverBgColor = 'hover:bg-primary-50',
  hoverTextColor = 'hover:text-primary-600',
  fontWeight = 'normal',
  linkTo = '/',
}: PageLinkProps) => {
  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  const getStyles = () => {
    switch (variant) {
      case 'ghost':
        return `${textColor} ${hoverTextColor} transition-colors px-2`
      case 'outline':
        return `border-1 ${borderColor} ${textColor} ${hoverBgColor} transition-colors px-6 py-2 rounded-lg`
      default:
        return `${bgColor} text-white ${hoverBgColor || 'hover:bg-primary-600'} transition-colors px-6 py-2 rounded-lg`
    }
  }

  const iconColor =
    variant === 'filled' ? 'stroke-white' : textColor.replace('text', 'stroke')

  return (
    <Link
      to={`${linkTo}`}
      className={`flex w-fit items-center gap-2 ${getStyles()}`}
    >
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          className={`${iconColor} ${iconClassName}`}
        />
      )}
      <span className={`${weightMap[fontWeight]} text-base`}>
        {pageLinkInnerText}
      </span>
    </Link>
  )
}

export default PageLink
