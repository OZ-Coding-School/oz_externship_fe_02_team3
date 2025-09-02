import ChatFloatButton from '@src/components/Chat/ChatFloatButton'
import Header from '@src/components/Header/Header'
import PageLink from '@src/components/PageLink'
import { UserRoundPlus } from 'lucide-react'
const HomePage = () => {
  return (
    <div>
      <Header />
      {/* iconClassName 있는 버전 */}

      {/* outline 만 있는 버전 */}
      <PageLink
        pageLinkInnerText="회원가입하기"
        icon={UserRoundPlus}
        variant="outline"
        textColor="text-primary-500"
        fontWeight="medium"
      />
      <ChatFloatButton />
    </div>
  )
}

export default HomePage
