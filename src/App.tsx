import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from '@layouts/MainLayout'
import TestHub from '@src/pages/test-page/TestHub'
import TestApplicationModalPage from './pages/test-page/TestModalPage'
import { ROUTES } from './constants/routes'
import RecruitmentPase from '@src/pages/recruitment-page/RecruitmentPage'
import TestUIPage from './pages/test-page/TestUIPage'
import RecruitmentManage from '@pages/RecruitmentManage'

const routes = [
  { index: true, element: <TestHub /> },
  { path: ROUTES.RECRUITMENT, element: <RecruitmentPase /> },
  { path: ROUTES.RECRUITMENT_MANAGE, element: <RecruitmentManage /> },
  { path: '/test/ApplicationModal', element: <TestApplicationModalPage /> },
  { path: '/test/UI', element: <TestUIPage /> },
]

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route, i) => (
          <Route
            key={route.path ?? `index-${i}`}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
}
