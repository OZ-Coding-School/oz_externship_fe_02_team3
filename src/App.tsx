import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from '@layouts/MainLayout'
import TestHub from '@pages/TestPage/TestHub'
import TestApplicationModalPage from './pages/TestPage/TestApplicationModalPage'
import { ROUTES } from './constants/routes'
import RecruitmentPase from '@pages/RecruitmentPage/RecruitmentPage'
import TestUIPage from './pages/TestPage/TestUIPage'

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
