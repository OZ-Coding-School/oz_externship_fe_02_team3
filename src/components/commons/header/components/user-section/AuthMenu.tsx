import PageLink from '@components/commons/page-link/PageLink'

export default function AuthMenu() {
  return (
    <>
      <PageLink
        pageLinkInnerText="로그인"
        variant="text"
        fontWeight="normal"
        link="/login"
        size="lg"
        className="p-0"
      />
      <PageLink
        pageLinkInnerText="회원가입"
        variant="filled"
        size="base"
        fontWeight="medium"
        link="/signup"
      />
    </>
  )
}
