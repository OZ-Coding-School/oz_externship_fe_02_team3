import { Link } from 'react-router-dom'
import { pageLinkClass, type PageLinkClassProps } from './linkClass'
import Icon from '@src/components/commons/Icon'
import type { LucideIcon } from 'lucide-react'
import type { LinkHTMLAttributes } from 'react'
import { cn } from '@utils/cn'
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

interface PageLinkProps
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    PageLinkClassProps {
  pageLinkInnerText?: string
  icon?: LucideIcon | SvgComponent
  iconClassName?: string
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconButtonSize?: 'sm' | 'md' | 'lg' | 'xl'
  ariaLabel?: string
  link: string
}

export default function PageLink({
  pageLinkInnerText,
  icon,
  iconClassName,
  size = 'base',
  iconButtonSize = 'md',
  variant = 'filled',
  fontWeight,
  iconSize = 'sm',
  ariaLabel,
  link,
  className,
  ...props
}: PageLinkProps) {
  const iconOnly = !!icon && !pageLinkInnerText
  return (
    <Link
      className={cn(
        pageLinkClass({
          size: !iconOnly ? size : undefined,
          iconButtonSize: iconOnly ? iconButtonSize : undefined,
          variant,
          fontWeight,
          iconOnly,
        }),
        className
      )}
      to={link}
      aria-label={ariaLabel || pageLinkInnerText}
      {...props}
    >
      {icon && <Icon icon={icon} size={iconSize} className={iconClassName} />}
      {pageLinkInnerText}
    </Link>
  )
}
