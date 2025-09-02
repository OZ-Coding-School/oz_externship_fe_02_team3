import Header from '@components/Header'
import Button from '@src/components/Button'
import PageLink from '@src/components/PageLink'
import { LogIn, MousePointer2, UserRoundPlus, X } from 'lucide-react'
const HomePage = () => {
  return (
    <div>
      <Header />
      <Button
        buttonInnerText="거절"
        size="base"
        variant="filled"
        bgColor="bg-danger-500"
        borderColor="border-danger-500"
        textColor="text-white"
        icon={X}
      />
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
