import { PAGE_TITLES, PAGE_DESCRIPTIONS } from '@src/constants/ui'
export function CourseHeader() {
  return (
    <div className="w-full p-8">
      <h2 className="pb-2 text-3xl font-bold text-gray-900">
        {PAGE_TITLES.COURSES}
      </h2>
      <p className="text-gray-600">{PAGE_DESCRIPTIONS.COURSES}</p>
    </div>
  )
}
