import { ROUTES } from '@src/constants/routes'
import PageLink from '@components/commons/page-link/PageLink'
import { LogIn as LogInIcon } from 'lucide-react'

export default function RecruitmentHeader() {
  return (
    <div className="flex w-[1216px] items-center justify-between">
      <div>
        <h3 className="pb-2 text-3xl font-bold">스터디 구인 공고</h3>
        <p className="text-gray-600">
          새로운 스터디 멤버를 찾거나 관심있는 스터디에 참여해보세요
        </p>
      </div>
      <PageLink
        pageLinkInnerText="로그인 후 공고 작성"
        icon={LogInIcon}
        variant="filled"
        size="lg"
        link={ROUTES.LOGIN}
      />
    </div>
  )
}
