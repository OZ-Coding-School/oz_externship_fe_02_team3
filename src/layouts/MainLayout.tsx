import Header from '@src/components/header/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  )
}
