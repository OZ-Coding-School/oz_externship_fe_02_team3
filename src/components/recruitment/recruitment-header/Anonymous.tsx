import PageLink from '@src/components/commons/page-link/PageLink'
import { ROUTES } from '@src/constants/routes'
import { LogIn as LogInIcon } from 'lucide-react'

export default function Anonymous() {
  return (
    <PageLink
      pageLinkInnerText="로그인 후 공고 작성"
      icon={LogInIcon}
      variant="filled"
      size="lg"
      link={ROUTES.LOGIN}
      className="whitespace-nowrap"
    />
  )
}
