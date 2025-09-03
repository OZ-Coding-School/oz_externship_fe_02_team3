<<<<<<< HEAD
import HeaderUserSection from './HeaderUserSection'
=======
import HeaderUserSection from '@components/Header/components/HeaderUserSection'
>>>>>>> develop
import { NAV_ITEMS } from '@src/constants/ui'
import { Link } from 'react-router-dom'

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
