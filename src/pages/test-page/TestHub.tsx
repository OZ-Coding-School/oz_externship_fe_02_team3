import { Link } from 'react-router-dom'
import { ROUTES } from '@constants/routes'

interface TestPage {
  to: string
  label: string
}

const pageItems: TestPage[] = [
  { to: ROUTES.RECRUITMENT, label: '공고 페이지' },
  { to: ROUTES.COURSES, label: '강의 페이지' },
]

const testItems: TestPage[] = [
  { to: '/test/ApplicationModal', label: '지원서 작성 모달 테스트' },
  { to: '/test/UI', label: '공통 컴포넌트 테스트' },
]

export default function TestHub() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Page</h1>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {pageItems.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className="bg-primary-500 hover:bg-primary-600 rounded px-4 py-3 text-center font-bold text-white"
          >
            {i.label}
          </Link>
        ))}
      </div>
      <h1 className="mb-4 text-2xl font-bold">Test Hub</h1>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {testItems.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className="bg-primary-500 hover:bg-primary-600 rounded px-4 py-3 text-center font-bold text-white"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
