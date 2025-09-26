import { NAV_ITEMS } from '@src/constants/ui'
import { Link } from 'react-router-dom'
import HeaderUserSection from './user-section/HeaderUserSection'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
export default function Navigation() {
  const isDesktop = useMediaQuery('(min-width: 840px)')
  return (
    <div className="flex items-center gap-8">
      {isDesktop && (
        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item) =>
            item.to.startsWith('http') ? (
              <a
                key={item.to}
                href={item.to}
                className="flex items-center text-base text-gray-700"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-base text-gray-700"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
      <HeaderUserSection />
    </div>
  )
}
