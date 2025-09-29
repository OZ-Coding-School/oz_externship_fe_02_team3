// src/components/recruitment-edit/RecEditBasicInfo.tsx
import { useEffect, useMemo, useState } from 'react'
import DropDown from '../commons/dropdown/DropDown'
import Calendar from '../commons/calendar/Calendar'

interface CoursePreview {
  id: string | number
  title: string
  price: number
}

interface RecEditBasicInfoProps {
  // 값
  title?: string
  groupName?: string
  capacityName?: string
  defaultDeadline?: Date | null

  // 변경 콜백
  onGroupChange?: (name: string | undefined) => void
  onTitleChange?: (v: string) => void
  onCapacityChange?: (v: string | undefined) => void
  onDeadlineChange?: (d: Date | null) => void

  // 부모에서 내려주는 옵션/프리뷰
  groupOptions?: string[]
  coursesPreview?: CoursePreview[]
  totalPricePreview?: number
}

// 정원 드롭다운(고정)
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

const fmtPrice = (n: number) => new Intl.NumberFormat('ko-KR').format(n)

export default function RecEditBasicInfo({
  title: defaultTitle,
  groupName, // ← 부모 값 그대로 사용(완전 제어)
  capacityName: defaultCapacityName,
  defaultDeadline = null,
  onGroupChange,
  onTitleChange,
  onCapacityChange,
  onDeadlineChange,
  groupOptions = [],
  coursesPreview = [],
  totalPricePreview = 0,
}: RecEditBasicInfoProps) {
  // 제목만 로컬 state로 두고 나머지는 제어형으로 처리
  const [title, setTitle] = useState<string>(defaultTitle ?? '')
  useEffect(() => setTitle(defaultTitle ?? ''), [defaultTitle])

  // 캘린더/정원은 기존처럼 로컬 state + 콜백
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(
    defaultCapacityName
  )
  const [deadline, setDeadline] = useState<Date | null>(defaultDeadline)
  useEffect(
    () => setSelectedCapacity(defaultCapacityName),
    [defaultCapacityName]
  )
  useEffect(() => setDeadline(defaultDeadline ?? null), [defaultDeadline])

  // 옵션 정규화 + 현재 선택값이 목록에 없으면 포함(초기표시 보장)
  const dropDownOptions: string[] = useMemo(() => {
    const base = (groupOptions ?? []).filter(Boolean)
    if (groupName && !base.includes(groupName)) base.unshift(groupName)
    return Array.from(new Set(base))
  }, [groupOptions, groupName])

  const courses = coursesPreview
  const total = totalPricePreview

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
        onChange={(e) => {
          setTitle(e.target.value)
          onTitleChange?.(e.target.value)
        }}
        className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        placeholder="예: React 스터디 함께하실 분을 찾습니다!"
      />

      {/* 대상 스터디 그룹 */}
      <label className="mt-6 mb-2 block text-sm font-medium text-gray-700">
        대상 스터디 그룹 <span className="text-danger-500">*</span>
      </label>
      <DropDown
        selected={groupName} // ← 제어형: 부모 값 사용
        options={dropDownOptions}
        onSelect={(name) => onGroupChange?.(name)} // ← 바로 부모에 전달
        placeholder="스터디 그룹을 선택해주세요"
      />

      {/* 선택 그룹의 강의 미리보기 (있을 때만) */}
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
                  {fmtPrice(c.price)}원
                </span>
              </li>
            ))}
            <li className="border-primary-200 mt-1 flex items-center justify-between border-t pt-2">
              <span className="text-primary-800 text-[14px] font-medium">
                총 강의 비용
              </span>
              <span className="text-primary-800 text-[14px] font-medium">
                {fmtPrice(total)}원
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* 마감일 & 예상 인원 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            공고 마감 기한 <span className="text-danger-500">*</span>
          </label>
          <Calendar
            value={deadline}
            onChange={(d) => {
              setDeadline(d)
              onDeadlineChange?.(d)
            }}
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
            onSelect={(name) => {
              setSelectedCapacity(name)
              onCapacityChange?.(name)
            }}
            placeholder="1명"
          />
        </div>
      </div>
    </div>
  )
}
