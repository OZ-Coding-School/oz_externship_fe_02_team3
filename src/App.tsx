import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/courses" />

      {/* recruitment 라우트 */}
      <Route path="/recruitment">
        <Route path=":id" />
        <Route path="create" />
        <Route path="manage" />
      </Route>
    </Routes>
  )
}

export default App
