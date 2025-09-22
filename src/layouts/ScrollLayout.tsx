import ScrollToTopButton from '@src/components/commons/ScrollToTopButton'
import { Outlet } from 'react-router-dom'

export default function ScrollLayout() {
  return (
    <>
      <Outlet />
      <ScrollToTopButton />
    </>
  )
}
