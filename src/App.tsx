import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from '@layouts/MainLayout'
import TestHub from '@src/pages/test-page/TestHub'
import TestApplicationModalPage from './pages/test-page/TestModalPage'
import { ROUTES } from './constants/routes'
import RecruitmentPase from '@src/pages/recruitment-page/RecruitmentPage'
import TestUIPage from './pages/test-page/TestUIPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TestHub />} />

        {/** PAGE */}
        <Route path={ROUTES.RECRUITMENT} element={<RecruitmentPase />} />

        {/** TEST */}
        <Route
          path="/test/ApplicationModal"
          element={<TestApplicationModalPage />}
        />
        <Route path="/test/UI" element={<TestUIPage />} />
      </Route>
    </Routes>
  )
}
