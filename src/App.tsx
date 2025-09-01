import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages'
import RecruitmentCreate from './pages/RecruitmentCreate'
import RecruitmentManage from './pages/RecruitmentManage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/courses" />

      {/* recruitment 라우트 */}
      <Route path="/recruitment" />
      <Route path=":id" />
      <Route path="create" element={<RecruitmentCreate />} />
      <Route path="manage" element={<RecruitmentManage />} />
      <Route />
    </Routes>
  )
}

export default App