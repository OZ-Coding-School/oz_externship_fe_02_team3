import HeaderUserSection from '@components/HeaderUserSection'
import { NAV_ITEMS } from '@src/constants/ui'
import { Link } from 'react-router'

const Navigation = () => {
  return (
    <nav className="flex items-center gap-8">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center text-base text-gray-700"
        >
          {item.label}
        </Link>
      ))}
      <HeaderUserSection />
    </nav>
  )
}

export default Navigation
