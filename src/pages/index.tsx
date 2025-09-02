import Header from '@components/Header'
import PageLink from '@src/components/PageLink'
import { LogIn, MousePointer2, UserRoundPlus } from 'lucide-react'
const HomePage = () => {
  return (
    <div>
      <Header />
      <PageLink
        pageLinkInnerText="로그인 후 공고 작성"
        variant="filled"
        icon={LogIn}
        linkTo="/"
      />
      {/* iconClassName 있는 버전 */}
      <PageLink
        pageLinkInnerText="지원하기"
        variant="filled"
        icon={MousePointer2}
        iconClassName="rotate-[90deg]"
        linkTo="/"
      />
      {/* outline 만 있는 버전 */}
      <PageLink
        pageLinkInnerText="회원가입하기"
        icon={UserRoundPlus}
        variant="outline"
        textColor="text-primary-600"
        linkTo="/"
      />
    </div>
  )
}

export default HomePage
