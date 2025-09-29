import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supa } from '@src/lib/supabase'
import DropDown from '../commons/dropdown/DropDown'
import Calendar from '../commons/calendar/Calendar'

const formatPrice = (n: number) => new Intl.NumberFormat('ko-KR').format(n)

interface RecCreateBasicInfoProps {
  onGroupChange?: (name: string | undefined) => void
  onTitleChange?: (v: string) => void
  onStudyGroupIdChange?: (id: number | null) => void
  onDeadlineChange?: (d: Date | null) => void
  onExpectedHeadcountChange?: (n: number | null) => void
}

// ── types used for course preview
interface LectureObj {
  id: number
  title: string
  original_price: number | string | null
  discount_price: number | string | null
}
interface SupaStudyLectureRow {
  lecture_id: number
  crawled_lectures: LectureObj | LectureObj[] | null
}
interface DBGroupCourseRow {
  lecture_id: number
  crawled_lectures: LectureObj | null
}

export default function RecCreateBasicInfo({
  onGroupChange,
  onTitleChange,
  onStudyGroupIdChange,
  onDeadlineChange,
  onExpectedHeadcountChange,
}: RecCreateBasicInfoProps) {
  const [selectedGroupName, setSelectedGroupName] = useState<string>()
  const [selectedCapacity, setSelectedCapacity] = useState<string>()
  const [deadLine, setDeadLine] = useState<Date | null>(null)

  /** 1) 스터디 그룹 목록 */
  const groupsQ = useQuery({
    queryKey: ['study_groups'],
    queryFn: async () => {
      const { data, error } = await supa
        .from('study_groups')
        .select('id,name')
        .order('name')
      if (error) throw error
      return (data ?? []) as { id: number; name: string }[]
    },
  })

  // 선택된 그룹의 id
  const selectedGroupId = useMemo(() => {
    if (!selectedGroupName) return null
    return groupsQ.data?.find((g) => g.name === selectedGroupName)?.id ?? null
  }, [groupsQ.data, selectedGroupName])

  /** 2) 선택된 그룹의 강의 목록 (미리보기) */
  const groupCoursesQ = useQuery({
    queryKey: ['group_courses', selectedGroupId],
    enabled: !!selectedGroupId,
    queryFn: async (): Promise<DBGroupCourseRow[]> => {
      const { data, error } = await supa
        .from('study_lectures')
        .select(
          `
          lecture_id,
          crawled_lectures ( id, title, original_price, discount_price )
        `
        )
        .eq('study_group_id', selectedGroupId!)
      if (error) throw error
      const rows = (data ?? []) as unknown as SupaStudyLectureRow[]
      return rows.map((r) => ({
        lecture_id: r.lecture_id,
        crawled_lectures: Array.isArray(r.crawled_lectures)
          ? (r.crawled_lectures[0] ?? null)
          : r.crawled_lectures,
      }))
    },
  })

  // 강의 미리보기 + 합계
  const courses = useMemo(() => {
    return (groupCoursesQ.data ?? [])
      .map((r) => r.crawled_lectures)
      .filter(Boolean) as LectureObj[]
  }, [groupCoursesQ.data])

  const total = useMemo(() => {
    return courses.reduce((sum, lec) => {
      const p = lec.discount_price ?? lec.original_price ?? 0
      const n = typeof p === 'string' ? Number(p) : (p ?? 0)
      return sum + (Number.isFinite(n) ? n : 0)
    }, 0)
  }, [courses])

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">기본 정보</p>

      {/* 제목 */}
      <label
        htmlFor="title"
        className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700"
      >
        공고 제목 <span className="text-danger-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        placeholder="예: React 스터디 함께하실 분을 찾습니다!"
        onChange={(e) => onTitleChange?.(e.target.value)}
      />

      {/* 스터디 그룹 */}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        대상 스터디 그룹 <span className="text-danger-500">*</span>
      </label>
      <DropDown
        selected={selectedGroupName}
        options={groupsQ.data ?? []}
        onSelect={(name) => {
          setSelectedGroupName(name)
          onGroupChange?.(name)
          const id = groupsQ.data?.find((g) => g.name === name)?.id ?? null
          onStudyGroupIdChange?.(id)
        }}
        placeholder={
          groupsQ.isLoading ? '불러오는 중…' : '스터디 그룹을 선택해주세요'
        }
      />

      {/* 선택된 그룹의 강의 미리보기 */}
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
                  {formatPrice(
                    Number(
                      (c.discount_price ?? c.original_price ?? 0) as number
                    )
                  )}
                  원
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

      {/* 마감일 & 인원 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-gray-700">
            공고 마감 기한 <span className="text-danger-500">*</span>
          </label>
          <Calendar
            value={deadLine}
            onChange={(d) => {
              setDeadLine(d)
              onDeadlineChange?.(d)
            }}
            fullWidth
            placeholder="-/-/-"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-gray-700">
            예상 모집 인원 <span className="text-danger-500">*</span>
          </label>
          <DropDown
            selected={selectedCapacity}
            options={[
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
            ]}
            onSelect={(name) => {
              setSelectedCapacity(name)
              const n = Number(String(name).replace(/[^0-9]/g, ''))
              onExpectedHeadcountChange?.(Number.isFinite(n) ? n : null)
            }}
            placeholder="1명"
          />
        </div>
      </div>
    </div>
  )
}
