import { useEffect, useMemo, useState } from 'react'
import DropDown from '../commons/dropdown/DropDown'
import Calendar from '../commons/calendar/Calendar'
import {
  getCoursesForGroup,
  sumCoursePrices,
} from '@src/mock/studyGroupCourseMap'

interface RecEditBasicInfoProps {
  title?: string
  groupName?: string
  capacityName?: string
  defaultDeadline?: Date | null
  onGroupChange?: (name: string | undefined) => void
}

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

const fmt = (n: number) => new Intl.NumberFormat('ko-KR').format(n)

export default function RecEditBasicInfo({
  title: defaultTitle,
  groupName: defaultGroupName,
  capacityName: defaultCapacityName,
  defaultDeadline = null,
  onGroupChange,
}: RecEditBasicInfoProps) {
  const [title, setTitle] = useState<string>(defaultTitle ?? '')
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
    defaultGroupName
  )
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(
    defaultCapacityName
  )
  const [deadline, setDeadline] = useState<Date | null>(defaultDeadline)

  // 부모에 그룹 변경 알림
  useEffect(() => {
    onGroupChange?.(selectedGroup)
  }, [selectedGroup, onGroupChange])

  // ▼ 선택된 그룹 → 강의 목록 + 합계
  const courses = useMemo(
    () => getCoursesForGroup(selectedGroup),
    [selectedGroup]
  )
  const total = useMemo(() => sumCoursePrices(courses), [courses])

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">기본 정보</p>

      {/* 공고 제목 */}
      <label
        htmlFor="title"
        className="mt-6 mb-2 block text-sm font-medium text-gray-700"
      >
        공고 제목 <span className="text-danger-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        placeholder="예: React 스터디 함께하실 분을 찾습니다!"
      />

      {/* 대상 스터디 그룹 */}
      <label className="mt-6 mb-2 block text-sm font-medium text-gray-700">
        대상 스터디 그룹 <span className="text-danger-500">*</span>
      </label>
      <DropDown
        selected={selectedGroup}
        options={studyGroup}
        onSelect={setSelectedGroup}
        placeholder="스터디 그룹을 선택해주세요"
      />

      {/* 선택된 그룹의 강의 정보 패널 */}
      {courses.length > 0 && (
        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-primary-800 mb-2 text-sm">
            선택된 그룹의 강의 정보
          </p>
          <ul className="space-y-1">
            {courses.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-1">
                <span className="text-primary-700 text-[14px]">{c.title}</span>
                <span className="text-primary-700 text-[14px] font-medium">
                  {fmt(c.price)}원
                </span>
              </li>
            ))}
            <li className="border-primary-200 mt-1 flex items-center justify-between border-t pt-2">
              <span className="text-primary-800 text-[14px] font-medium">
                총 강의 비용
              </span>
              <span className="text-primary-800 text-[14px] font-medium">
                {fmt(total)}원
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* 공고 마감 기한 & 예상 모집 인원 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            공고 마감 기한 <span className="text-danger-500">*</span>
          </label>
          <Calendar
            value={deadline}
            onChange={setDeadline}
            fullWidth
            placeholder="-/-/-"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            예상 모집 인원 <span className="text-danger-500">*</span>
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
