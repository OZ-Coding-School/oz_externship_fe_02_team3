import BackButton from '@components/commons/BackButton'
import { Plus as PlusIcon } from 'lucide-react'
import PageLink from '@components/commons/page-link/PageLink'

export default function RecManageHeader() {
  return (
    <div className="flex w-full items-center">
      {/* Left: 제목/설명 (모바일 w-full, 데스크탑 고정폭 가능) */}
      <div className="flex h-16 min-w-0 flex-1 items-center">
        <BackButton />
        <div className="ml-3 flex min-w-0 flex-col">
          <p className="text-2xl leading-8 font-bold text-gray-900 sm:text-[30px] sm:leading-9">
            공고 관리
          </p>
          <p className="text-sm leading-5 font-normal text-gray-600 sm:text-[16px] sm:leading-6">
            내가 등록한 스터디 구인 공고를 관리하세요
          </p>
        </div>
      </div>

      <div className="ml-auto flex flex-shrink-0 items-center gap-2">
        {/* 모바일 전용: 아이콘만 (+) */}
        <PageLink
          icon={PlusIcon}
          link="/recruitment/create"
          aria-label="새 공고 작성하기"
          className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-400 inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:hidden"
        />
        {/* 데스크톱 전용: 텍스트+아이콘 */}
        <PageLink
          pageLinkInnerText="새 공고 작성하기"
          icon={PlusIcon}
          variant="filled"
          size="lg"
          link="/recruitment/create"
          className="hidden sm:inline-flex"
        />
      </div>
    </div>
  )
}
