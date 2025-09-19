import { useState, useEffect } from 'react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'
import { Z_INDEX } from '@src/constants/ui'
import { useLocation } from 'react-router-dom'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        className={`group fixed right-6 bottom-28 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-white shadow-lg transition-all hover:bg-gray-400 ${Z_INDEX.BUTTON}`}
      >
        <ArrowUpIcon size={28} />
      </button>
    )
  )
}
