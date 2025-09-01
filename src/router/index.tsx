import { createBrowserRouter } from 'react-router'
import CoursesPage from '@pages/Courses/CoursesPage'

export const router = createBrowserRouter([
  { path: '/', element: <CoursesPage /> },
  { path: '/courses', element: <CoursesPage /> },
])
