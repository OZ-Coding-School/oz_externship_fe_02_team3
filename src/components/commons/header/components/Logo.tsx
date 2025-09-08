import { Link } from 'react-router-dom'
import StudyLogo from '@assets/images/logo_studyhub.svg?react'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <StudyLogo className="size-8" aria-label="StudyHub 로고" />
      <p className="text-primary-600 text-xl font-bold">StudyHub</p>
    </Link>
  )
}
