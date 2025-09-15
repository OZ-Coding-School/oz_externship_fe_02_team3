import Badge from '@components/commons/Badge'
import Button from '@components/commons/button/Button'
import DropDown from '@src/components/commons/dropdown/DropDown'
import PageLink from '@components/commons/page-link/PageLink'
import {
  FolderIcon,
  LogIn as LogInIcon,
  MousePointer2 as MousePointer2Icon,
  UserRoundPlus as UserRoundPlusIcon,
  X as CloseIcon,
  Bookmark as BookmarkIcon,
} from 'lucide-react'
import { useState } from 'react'
import Calendar from '@src/components/commons/calendar/Calendar'
import { useToast } from '@src/components/commons/toast'
import TagCheckbox from '@src/components/commons/tag/TagCheckbox'
import type { TagOption } from '@src/components/commons/tag/SelectedTagList'
import SelectedTagList from '@src/components/commons/tag/SelectedTagList'
import Pagination from '@src/components/commons/pagination/Pagination'

export default function TestUIPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState('인기순')
  const toast = useToast()
  const [selectedIds, setSelectedIds] = useState<string[]>(['t1'])

  // 임시 데이터 (나중에 상수로 분리)
  const dummyTags: TagOption[] = [
    { id: 't1', label: '초보자환영' },
    { id: 't2', label: '주말스터디' },
    { id: 't3', label: '프로젝트중심' },
  ]

  //페이지네이션 임시 변수
  const [page, setPage] = useState(1)
  const size = 5
  const totalCount = 50 // 서버 응답에서 count로 받아옴

  const categories = [
    { id: 1, name: '전체' },
    { id: 2, name: '프론트엔드' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React' },
    { id: 5, name: '백엔드' },
    { id: 6, name: '클라우드' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'TypeScript' },
    { id: 9, name: 'Python' },
    { id: 10, name: 'Django' },
    { id: 11, name: 'Spring' },
    { id: 12, name: 'Vue.js' },
    { id: 13, name: 'Angular' },
    { id: 14, name: 'Svelte' },
    { id: 15, name: 'Next.js' },
    { id: 16, name: 'Nuxt.js' },
    { id: 17, name: 'Express' },
    { id: 18, name: 'NestJS' },
    { id: 19, name: 'GraphQL' },
    { id: 20, name: 'Redux' },
    { id: 21, name: 'MobX' },
    { id: 22, name: 'Recoil' },
    { id: 23, name: 'Jest' },
    { id: 24, name: 'Cypress' },
    { id: 25, name: 'Storybook' },
    { id: 26, name: 'Webpack' },
    { id: 27, name: 'Vite' },
    { id: 28, name: 'Babel' },
    { id: 29, name: 'ESLint' },
    { id: 30, name: 'Prettier' },
    { id: 31, name: 'Git' },
    { id: 32, name: 'GitHub Actions' },
    { id: 33, name: 'CI/CD' },
    { id: 34, name: 'AWS' },
    { id: 35, name: 'GCP' },
    { id: 36, name: 'Azure' },
    { id: 37, name: 'Firebase' },
    { id: 38, name: 'Docker' },
    { id: 39, name: 'Kubernetes' },
    { id: 40, name: 'Linux' },
    { id: 41, name: 'Figma' },
    { id: 42, name: 'UI/UX' },
    { id: 43, name: '모바일' },
    { id: 44, name: 'iOS' },
    { id: 45, name: 'Android' },
    { id: 46, name: 'Flutter' },
    { id: 47, name: 'React Native' },
  ]
  const sortOptions = [
    { id: 1, name: '인기순' },
    { id: 2, name: '최신순' },
    { id: 3, name: '가격낮은순' },
    { id: 4, name: '평점높은순' },
  ]
  const [date, setDate] = useState<Date | null>(null)
  return (
    <>
      <div className="space-y-4 p-4">
        {/* 선택 가능한 드롭다운 */}
        <DropDown
          selected={selectedCategory}
          options={categories}
          onSelect={setSelectedCategory}
          leftIcon={FolderIcon}
          placeholder="카테고리 선택"
        />
        {/* 정렬 드롭다운 */}
        <DropDown
          selected={selectedSort}
          options={sortOptions}
          onSelect={setSelectedSort}
          placeholder="정렬 선택"
        />

        {/* 비활성화된 드롭다운 */}
        <DropDown
          selected="비활성화됨"
          options={[]}
          disabled
          className="w-fit"
        />

        {/* 페이지 링크 */}
        <PageLink
          link="/"
          pageLinkInnerText="로그인 후 공고 작성"
          icon={LogInIcon}
        />
        <PageLink
          link="/"
          pageLinkInnerText="지원하기"
          icon={MousePointer2Icon}
          iconClassName="rotate-[90deg]"
        />
        <PageLink
          link="/"
          pageLinkInnerText="회원가입하기"
          icon={UserRoundPlusIcon}
          variant="outline"
          fontWeight="medium"
        />

        {/* 버튼 */}
        <Button
          buttonInnerText="지원서 제출"
          icon={MousePointer2Icon}
          iconClassName="rotate-[90deg]"
          size="base"
          iconSize="sm"
        />
        <Button buttonInnerText="취소" size="base" variant="outline" />
        <Button
          buttonInnerText="거절"
          size="base"
          iconSize="sm"
          variant="danger"
          icon={CloseIcon}
        />
        <Button
          buttonInnerText="선택 완료"
          size="base"
          variant="outline"
          disabled
        />

        <Button
          icon={BookmarkIcon}
          variant="outline"
          iconButtonSize="lg"
          ariaLabel="북마크"
          iconClassName="stroke-gray-600"
          className="rounded-lg bg-white"
        />

        <Button
          icon={BookmarkIcon}
          variant="ghost"
          iconButtonSize="md"
          ariaLabel="북마크"
          iconClassName="stroke-gray-600"
          className="bg-white/90"
        />

        {/* 뱃지 */}
        <Badge badgeTitle="거절됨" className="bg-danger-100 text-danger-800" />

        <Button
          buttonInnerText="성공 토스트"
          onClick={() =>
            toast.success({
              title: '성공적으로 저잘되었습니다.',
              content: '변경사항이 성공적으로 적용되었습니다.',
              showBar: true,
            })
          }
        />
        {/* 토스트 알림 컴포넌트 태스트 */}
        <Button
          buttonInnerText="에러 토스트"
          onClick={() =>
            toast.error({
              title: '주의가 필요합니다.',
              content: '일부 정보가 누락되었습니다. 확인 후 다시 시도해주세요.',
              showBar: true,
            })
          }
        />
        <Button
          buttonInnerText="경고 토스트"
          onClick={() =>
            toast.warning({
              title: '오류가 발생했습니다.',
              content: '네트워크 연결을 확인하고 다시 시도해주세요.',

              showBar: true,
            })
          }
        />
        <Calendar
          value={date}
          onChange={setDate}
          variant="outline"
          size="md"
          width={300}
        />

        {/* 태그 선택 컴포넌트 테스트 */}

        <h2 className="text-lg font-bold">Tag 컴포넌트 테스트</h2>

        {/* 선택된 태그 리스트 */}
        <SelectedTagList
          selectedIds={selectedIds}
          options={dummyTags}
          onRemove={(id) =>
            setSelectedIds((prev) => prev.filter((v) => v !== id))
          }
        />

        {/* 체크박스 리스트 */}
        <div className="space-y-2">
          {dummyTags.map((tag) => (
            <TagCheckbox
              key={tag.id}
              label={tag.label}
              checked={selectedIds.includes(tag.id)}
              onChange={(next) =>
                setSelectedIds((prev) =>
                  next ? [...prev, tag.id] : prev.filter((v) => v !== tag.id)
                )
              }
            />
          ))}
        </div>
        {/* 페이지 네이션 테스트  */}
        <Pagination
          page={page}
          totalCount={totalCount}
          size={size}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
