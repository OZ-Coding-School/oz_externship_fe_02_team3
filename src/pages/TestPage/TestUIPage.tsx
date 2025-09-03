import Badge from '@components/Badge'
import Button from '@components/Button'
import DropDown from '@components/DropDown'
import PageLink from '@components/PageLink'
import {
  ChevronDown,
  FolderIcon,
  LogIn,
  MousePointer2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { useState } from 'react'

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
    <div className="space-y-4 p-4">
      {/* 선택 가능한 드롭다운 */}
      <DropDown
        selected={selectedCategory}
        options={categories}
        onSelect={setSelectedCategory}
        leftIcon={FolderIcon}
        rightIcon={ChevronDown}
        placeholder="카테고리 선택"
        width="w-full"
      />
      {/* 정렬 드롭다운 */}
      <DropDown
        selected={selectedSort}
        options={sortOptions}
        onSelect={setSelectedSort}
        rightIcon={ChevronDown}
        placeholder="정렬 선택"
        width="w-full"
      />

      {/* 비활성화된 드롭다운 */}
      <DropDown
        selected="비활성화됨"
        options={[]}
        disabled
        rightIcon={ChevronDown}
        width="w-full"
      />

      {/* 페이지 링크 */}
      <PageLink pageLinkInnerText="로그인 후 공고 작성" icon={LogIn} />
      <PageLink
        pageLinkInnerText="지원하기"
        icon={MousePointer2}
        iconClassName="rotate-[90deg]"
      />
      <PageLink
        pageLinkInnerText="회원가입하기"
        icon={UserRoundPlus}
        variant="outline"
        textColor="text-primary-600"
        fontWeight="medium"
      />

      {/* 버튼 */}
      <Button
        buttonInnerText="지원서 제출"
        icon={MousePointer2}
        iconClassName="rotate-[90deg]"
        size="base"
      />
      <Button
        buttonInnerText="취소"
        size="base"
        variant="outline"
        bgColor="bg-transparent"
        borderColor="border-gray-300"
      />
      <Button
        buttonInnerText="거절"
        size="base"
        variant="outline"
        bgColor="bg-danger-500"
        borderColor="border-danger-500"
        textColor="text-danger-500"
        icon={X}
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
  )
}
