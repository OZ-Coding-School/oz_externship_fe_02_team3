import PageLink from '@components/PageLink'
import { LogIn, User, UserPlus } from 'lucide-react'

export default function Anonymous() {
  return (
    <div className="flex w-[1150px] flex-col items-center">
      <div className="bg-primary-100 mb-3 flex h-16 w-16 items-center justify-center rounded-full">
        <User className="text-primary-600 h-6 w-6"></User>
      </div>
      <h2 className="mb-3 text-2xl font-semibold">
        개인 맞춤 스터디 공고를 받아보세요
      </h2>
      <div className="mb-6 text-center text-gray-600">
        <p>로그인하시면 관심 분야와 수강 강의를 바탕으로 맞춤형 스터디 공고</p>
        <p>를 추천해드립니다</p>
      </div>
      <div className="flex gap-4">
        <PageLink
          pageLinkInnerText="로그인 하기"
          variant="filled"
          icon={LogIn}
        />
        <PageLink
          pageLinkInnerText="회원가입하기"
          icon={UserPlus}
          variant="outline"
        />
      </div>
      <div className="mt-8 flex flex-col gap-4 text-center">
        <p className="text-sm text-gray-600">
          로그인 후 이런 맞춤 추천을 받을 수 있어요
        </p>
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

// 예시 카드
function Card() {
  return (
    <div className="relative w-[370px] rounded border border-gray-200 bg-white p-4">
      <div className="mb-3 flex">
        <div className="mr-3 h-8 w-12 rounded bg-gray-100"></div>
        <div>
          <div className="mb-1 h-4 w-50 rounded bg-gray-100"></div>
          <div className="h-3 w-35 rounded bg-gray-100"></div>
        </div>
      </div>
      <div className="mb-2 h-3 w-full rounded bg-gray-100"></div>
      <div className="mb-3 h-3 w-56 rounded bg-gray-100"></div>
      <div className="flex gap-1">
        <div className="bg-primary-100 h-5 w-12 rounded"></div>
        <div className="bg-primary-100 h-5 w-16 rounded"></div>
      </div>
      <div className="bg-primary-300 absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-sm text-white">
        ★
      </div>
    </div>
  )
}
