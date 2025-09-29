import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from '@layouts/MainLayout'
import TestHub from '@src/pages/test-page/TestHub'
import TestApplicationModalPage from './pages/test-page/TestModalPage'
import { ROUTES } from './constants/routes'
import RecruitmentPase from '@pages/RecruitmentPage'
import TestUIPage from './pages/test-page/TestUIPage'
import RecruitmentManage from '@pages/RecruitmentManage'
import RecruitmentCreate from './pages/RecruitmentCreate'
import CoursesPage from './pages/CoursesPage'
import { ToastPorvider } from './components/commons/toast'
import RecruitmentDetailPage from './pages/RecruitmentDetailPage'
import RecruitmentEdit from './pages/RecruitmentEdit'
import ScrollLayout from './layouts/ScrollLayout'
import NotFoundPage from './pages/NotFoundPage'
import { useAuth } from './store/auth'
import { useEffect } from 'react'

const routes = [
  { path: ROUTES.HOME, element: <TestHub /> },
  { path: ROUTES.RECRUITMENT_CREATE, element: <RecruitmentCreate /> },
  { path: ROUTES.RECRUITMENT_EDIT_PATTERN, element: <RecruitmentEdit /> },
  { path: '/test/ApplicationModal', element: <TestApplicationModalPage /> },
  { path: '/test/UI', element: <TestUIPage /> },
]
const scrollRoutes = [
  { path: ROUTES.RECRUITMENT, element: <RecruitmentPase /> },
  { path: ROUTES.RECRUITMENT_DETAIL, element: <RecruitmentDetailPage /> },
  { path: ROUTES.RECRUITMENT_MANAGE, element: <RecruitmentManage /> },
  { path: ROUTES.COURSES, element: <CoursesPage /> },
]

export default function App() {
  const bootstrap = useAuth((state) => state.bootstrap)

  useEffect(() => {
    // 앱 시작시 사용자 정보 로드
    bootstrap('public')
  }, [bootstrap])
  return (
    <ToastPorvider max={5}>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<ScrollLayout />}>
            {scrollRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </ToastPorvider>
  )
}
