import { Route, Routes } from 'react-router'
import './App.css'
import Test from '@pages/test'
import HomePage from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
