import PageLink from '@src/components/commons/page-link/PageLink'
import { ROUTES } from '@src/constants/routes'
import { FileText as FileTextIcon, Plus as PlusIcon } from 'lucide-react'

export default function LoggedIn() {
  return (
    <div className="flex gap-3">
      <PageLink
        pageLinkInnerText="공고 관리"
        icon={FileTextIcon}
        variant="outline"
        size="lg"
        link={ROUTES.RECRUITMENT_MANAGE}
      />
      <PageLink
        pageLinkInnerText="공고 작성하기"
        icon={PlusIcon}
        variant="filled"
        size="lg"
        link={ROUTES.RECRUITMENT_CREATE}
      />
    </div>
  )
}
