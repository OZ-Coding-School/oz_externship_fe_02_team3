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

export default function TestUIPage() {
  return (
    <div className="space-y-4 p-4">
      {/* 드롭다운 */}
      <DropDown
        dropdownTitle="전체 카테고리"
        leftIcon={FolderIcon}
        rightIcon={ChevronDown}
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
