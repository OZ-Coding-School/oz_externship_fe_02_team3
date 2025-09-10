import Badge from '@components/commons/Badge'
import Button from '@components/commons/button/Button'
import DropDown from '@src/components/commons/dropdown/DropDown'
import PageLink from '@components/commons/page-link/PageLink'
import ChatFloatButton from '@components/commons/chat/ChatFloatButton'
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
import Toast from '@src/components/commons/toast/Toast'

export default function TestUIPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState('인기순')
  const [openToast, setOpenToast] = useState(false)

  // 임시 데이터 (나중에 상수로 분리)
  const categories = [
    '전체',
    '프론트엔드',
    'JavaScript',
    'React',
    '백엔드',
    '클라우드',
  ]
  const sortOptions = ['인기순', '최신순', '가격낮은순', '평점높은순']
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
          className="w-fit"
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
      </div>
      <div className="flex gap-2">
        <Button
          buttonInnerText="토스트 띄우기"
          size="base"
          onClick={() => setOpenToast(true)}
        />
      </div>
      {/* 토스트 알림 컴포넌트 태스트 */}
      {openToast && (
        <Toast
          type="success"
          title="저장 완료"
          onClose={() => setOpenToast(false)}
          showBar
        >
          변경사항이 성공적으로 저장되었습니다.
        </Toast>
      )}
      <ChatFloatButton />
      <Calendar
        value={date}
        onChange={setDate}
        variant="outline"
        size="md"
        width={300}
      />
    </>
  )
}
