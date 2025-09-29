import PageLink from '@components/commons/page-link/PageLink'
const ACCOUNT = 'https://account.ozcoding.site'
const returnTo = encodeURIComponent(window.location.href)
export default function AuthMenu() {
  return (
    <>
      <PageLink
        pageLinkInnerText="로그인"
        variant="text"
        fontWeight="normal"
        link={`${ACCOUNT}/auth/login?return_to=${returnTo}`}
        size="lg"
        className="p-0"
      />
      <PageLink
        pageLinkInnerText="회원가입"
        variant="filled"
        size="base"
        fontWeight="medium"
        link="/signup"
        className="text-base"
      />
    </>
  )
}
