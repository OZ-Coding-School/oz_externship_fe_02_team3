import Badge from '@components/commons/Badge'
import Button from '@components/commons/button/Button'
import DropDown from '@components/commons/DropDown'
import PageLink from '@components/commons/page-link/PageLink'
import ChatFloatButton from '@components/commons/chat/ChatFloatButton'
import {
  ChevronDown as ChevronDownIcon,
  FolderIcon,
  LogIn as LogInIcon,
  MousePointer2 as MousePointer2Icon,
  UserRoundPlus as UserRoundPlusIcon,
  X as CloseIcon,
} from 'lucide-react'
import { useState } from 'react'
import { ROUTES } from '@src/constants/routes'

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

        {/* 뱃지 */}
        <Badge badgeTitle="거절됨" sideClass="bg-danger-100 text-danger-800" />
      </div>
      <ChatFloatButton />
    </>
  )
}
