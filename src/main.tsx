// src/main.tsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// MSW 초기화 (개발 환경에서만)
async function enableMocking() {
  // .env 파일 없이도 바로 사용 가능!
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mock/browser.ts')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  )
})
