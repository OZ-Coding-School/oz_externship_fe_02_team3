import { useMemo, useState } from 'react'
import DropDown from '../commons/dropdown/DropDown'
import Calendar from '../commons/calendar/Calendar'
import {
  getCoursesForGroup,
  sumCoursePrices,
} from '@src/mock/studyGroupCourseMap'

const studyGroup = [
  { id: 1, name: '스터디 그룹1' },
  { id: 2, name: '스터디 그룹2' },
  { id: 3, name: '스터디 그룹3' },
  { id: 4, name: '스터디 그룹4' },
]

const capacityGroup = [
  { id: 1, name: '1명' },
  { id: 2, name: '2명' },
  { id: 3, name: '3명' },
  { id: 4, name: '4명' },
  { id: 5, name: '5명' },
  { id: 6, name: '6명' },
  { id: 7, name: '7명' },
  { id: 8, name: '8명' },
  { id: 9, name: '9명' },
  { id: 10, name: '10명' },
]

const formatPrice = (n: number) => new Intl.NumberFormat('ko-KR').format(n)

interface RecCreateBasicInfoProps {
  onGroupChange?: (name: string | undefined) => void
}

export default function RecCreateBasicInfo({
  onGroupChange,
}: RecCreateBasicInfoProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>()
  const [selectedCapacity, setSelectedCapacity] = useState<string>()
  const [deadLine, setDeadLine] = useState<Date | null>(null)

  const courses = useMemo(
    () => getCoursesForGroup(selectedGroup),
    [selectedGroup]
  )
  const total = useMemo(() => sumCoursePrices(courses), [courses])

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">기본 정보</p>
      {/* 공고 제목 field*/}
      <label
        htmlFor="title"
        className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700"
      >
        공고 제목
        <span className="text-danger-500" aria-label="필수 입력">
          {' '}
          *
        </span>
      </label>
      <input
        id="title"
        type="text"
        className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        aria-label="공고 제목 input"
        placeholder="예: React 스터디 함께하실 분을 찾습니다!"
      />

      {/* 대상 스터디 그룹 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        대상 스터디 그룹
        <span className="text-danger-500" aria-label="필수 입력">
          {' '}
          *
        </span>
      </label>
      <DropDown
        selected={selectedGroup}
        options={studyGroup}
        onSelect={(name) => {
          setSelectedGroup(name)
          onGroupChange?.(name)
        }}
        placeholder="스터디 그룹을 선택해주세요"
      />

      {/* 선택된 그룹의 강의 정보 패널 */}
      {courses.length > 0 && (
        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-primary-800 mb-2 text-sm">
            선택된 그룹의 강의 정보
          </p>
          <ul className="space-y-1">
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex items-center justify-between py-1"
              >
                <span className="text-primary-700 text-[14px]">
                  {course.title}
                </span>
                <span className="text-primary-700 text-[14px] font-medium">
                  {formatPrice(course.price)}원
                </span>
              </li>
            ))}
            <li className="border-primary-200 mt-1 flex items-center justify-between border-t pt-2">
              <span className="text-primary-800 text-[14px] font-medium">
                총 강의 비용
              </span>
              <span className="text-primary-800 text-[14px] font-medium">
                {formatPrice(total)}원
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* 공고 마감 기한 & 예상 모집 인원 field*/}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 공고 마감 기한 field */}
        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-gray-700">
            공고 마감 기한
            <span className="text-danger-500" aria-label="필수 입력">
              {' '}
              *
            </span>
          </label>
          <Calendar
            value={deadLine}
            onChange={setDeadLine}
            fullWidth
            placeholder="-/-/-"
          />
        </div>

        {/* 예상 모집 인원 field */}
        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-gray-700">
            예상 모집 인원
            <span className="text-danger-500" aria-label="필수 입력">
              {' '}
              *
            </span>
          </label>
          <DropDown
            selected={selectedCapacity}
            options={capacityGroup}
            onSelect={setSelectedCapacity}
            placeholder="1명"
          />
        </div>
      </div>
    </div>
  )
}
