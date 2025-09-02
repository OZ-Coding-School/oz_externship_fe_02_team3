import { Link } from 'react-router'
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <p className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-white">
        S
      </p>
      <p className="text-primary-600 text-xl font-bold">StudyHub</p>
    </Link>
  )
}
export default Logo
