import Badge from '@components/Badge'
import Button from '@src/components/button/Button'
import DropDown from '@components/DropDown'
import PageLink from '@src/components/page-link/PageLink'
import {
  ChevronDown as ChevronDownIcon,
  FolderIcon,
  LogIn as LogInIcon,
  MousePointer2 as MousePointer2Icon,
  UserRoundPlus as UserRoundPlusIcon,
  X as CloseIcon,
} from 'lucide-react'
import { useState } from 'react'
import ChatFloatButton from '@src/components/chat/ChatFloatButton'

export default function TestUIPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState('인기순')

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
  return (
    <>
      <div className="space-y-4 p-4">
        {/* 선택 가능한 드롭다운 */}
        <DropDown
          selected={selectedCategory}
          options={categories}
          onSelect={setSelectedCategory}
          leftIcon={FolderIcon}
          rightIcon={ChevronDownIcon}
          placeholder="카테고리 선택"
          className="w-fit"
        />
        {/* 정렬 드롭다운 */}
        <DropDown
          selected={selectedSort}
          options={sortOptions}
          onSelect={setSelectedSort}
          rightIcon={ChevronDownIcon}
          placeholder="정렬 선택"
          className="w-fit"
        />

        {/* 비활성화된 드롭다운 */}
        <DropDown
          selected="비활성화됨"
          options={[]}
          disabled
          rightIcon={ChevronDownIcon}
          className="w-fit"
        />

        {/* 페이지 링크 */}
        <PageLink
          pageLinkInnerText="로그인 후 공고 작성"
          icon={LogInIcon}
          variant="filled"
          size="base"
          link=""
          className="px-6 py-2 text-base"
        />
        <PageLink
          pageLinkInnerText="로그인하기"
          icon={LogInIcon}
          variant="filled"
          size="lg"
          link=""
        />
        <PageLink
          pageLinkInnerText="지원하기"
          icon={MousePointer2Icon}
          iconClassName="rotate-[90deg]"
          variant="filled"
          size="lg"
          link=""
          className="px-8 py-3"
        />
        <PageLink
          pageLinkInnerText="회원가입하기"
          icon={UserRoundPlusIcon}
          variant="outline"
          size="base"
          className="px-[25px] py-[12px] text-base"
          link=""
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

        {/* 뱃지 */}
        <Badge badgeTitle="거절됨" sideClass="bg-danger-100 text-danger-800" />
      </div>
      <ChatFloatButton />
    </>
  )
}
