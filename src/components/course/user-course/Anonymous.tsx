import PageLink from '@src/components/commons/page-link/PageLink'
import { EXTERNAL, withReturnTo } from '@src/constants/external'
import {
  LogIn as LogInIcon,
  BookOpen as BookOpenIcon,
  UserPlus as UserPlusIcon,
} from 'lucide-react'

interface AnonymousProps {
  userStyle: string
}
export default function Anonymous({ userStyle }: AnonymousProps) {
  return (
    <div className={`${userStyle} flex max-w-[1216px] flex-col items-center`}>
      <div className="bg-primary-100 mb-3 flex h-16 w-16 items-center justify-center rounded-full">
        <BookOpenIcon className="text-primary-600 h-6 w-6" />
      </div>
      <h2 className="mb-3 text-2xl font-semibold">
        개인 맞춤 강의를 추천받아보세요
      </h2>
      <div className="mb-6 text-center text-gray-600">
        <p>로그인하시면 관심 분야와 학습 수준에 맞는 강의를 추천해드리고,</p>
        <p>북마크와 수강 진도 관리를 할 수 있습니다</p>
      </div>
      <div className="flex gap-4">
        <PageLink
          pageLinkInnerText="로그인 하기"
          variant="filled"
          icon={LogInIcon}
          link={withReturnTo(EXTERNAL.LOGIN)}
          isExternal
        />
        <PageLink
          pageLinkInnerText="회원가입하기"
          icon={UserPlusIcon}
          link={EXTERNAL.SIGNUP}
          isExternal
          variant="outline"
        />
      </div>

      {/* 강의 미리보기 카드들 - 데이터가 있을 때만 표시 */}
      <div className="mt-8 flex flex-col gap-4 text-center">
        <p className="text-sm text-gray-600">
          로그인 후 이런 맞춤 추천을 받을 수 있어요
        </p>
        <div className="flex gap-4">
          <CourseSkeleton />
          <CourseSkeleton className="hidden lg:block" />
          <CourseSkeleton className="hidden xl:block" />
        </div>
      </div>
    </div>
  )
}

interface CourseSkeletonProps {
  className?: string
}

// 강의 미리보기 카드
function CourseSkeleton({ className }: CourseSkeletonProps) {
  return (
    <div
      className={`relative w-[370px] rounded-lg border border-gray-200 bg-white p-4 ${className}`}
    >
      {/* 썸네일 영역 */}
      <div className="mb-3 h-24 w-full rounded bg-gray-100"></div>

      {/* 플랫폼 배지 */}
      <div className="mb-2 h-5 w-8 rounded bg-gray-100"></div>

      {/* 제목 */}
      <div className="mb-2 h-4 w-40 rounded bg-gray-100"></div>

      {/* 강사명 */}
      <div className="mb-3 h-3 w-20 rounded bg-gray-100"></div>

      {/* 설명 */}
      <div className="mb-2 h-4 w-full rounded bg-gray-100"></div>

      {/* 평점 */}
      <div className="mb-3 flex gap-2">
        <div className="h-3 w-16 rounded bg-gray-100"></div>
        <div className="h-3 w-12 rounded bg-gray-100"></div>
      </div>

      {/* 가격 */}
      <div className="mb-3 flex gap-2">
        <div className="h-3 w-16 rounded bg-gray-100"></div>
      </div>

      <div className="flex justify-between">
        <div className="h-4 w-20 rounded bg-gray-100"></div>
        <div className="h-4 w-16 rounded bg-gray-100"></div>
      </div>

      {/* 추천 별표 */}
      <div className="bg-primary-300 absolute -top-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-sm text-white">
        ★
      </div>
    </div>
  )
}
