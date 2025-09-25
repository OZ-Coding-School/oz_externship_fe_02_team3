import { useRef, useState, useEffect } from 'react'

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // 초기 커서 설정
    element.classList.add('cursor-grab')

    // 마우스 이벤트
    const handleMouseDown = (e: MouseEvent) => {
      setIsDown(true)
      setIsDragging(false)
      setStartX(e.pageX - element.offsetLeft)
      setScrollLeft(element.scrollLeft)
      document.body.classList.add('select-none')
      element.classList.remove('cursor-grab')
      element.classList.add('cursor-grabbing')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      setIsDragging(true)
      const x = e.pageX - element.offsetLeft
      const walk = (x - startX) * 1.5 // 스크롤 속도 조정
      element.scrollLeft = scrollLeft - walk
    }

    const handleMouseUpOrLeave = () => {
      setIsDown(false)
      setIsDragging(false)
      document.body.classList.remove('select-none')
      element.classList.remove('cursor-grabbing')
      element.classList.add('cursor-grab')
    }

    // 휠 이벤트
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Shift + 휠 또는 터치패드 가로 스크롤
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        element.scrollLeft += e.deltaX || e.deltaY
      } else {
        element.scrollLeft += e.deltaY
      }
    }

    // 터치 이벤트
    const handleTouchStart = (e: TouchEvent) => {
      setIsDown(true)
      setIsDragging(false)
      setStartX(e.touches[0].pageX - element.offsetLeft)
      setScrollLeft(element.scrollLeft)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      e.preventDefault()
      setIsDragging(true)
      const x = e.touches[0].pageX - element.offsetLeft
      const walk = (x - startX) * 1.5
      element.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
      setIsDown(false)
      setIsDragging(false)
    }

    // 클릭 이벤트 (드래그 후 클릭 방지)
    const handleClick = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // 이벤트 리스너 등록
    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseup', handleMouseUpOrLeave)
    element.addEventListener('mouseleave', handleMouseUpOrLeave)
    element.addEventListener('wheel', handleWheel, { passive: false })
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd)
    element.addEventListener('click', handleClick, true)

    // 글로벌 마우스업 이벤트
    const handleGlobalMouseUp = () => {
      if (isDown) {
        setIsDown(false)
        setIsDragging(false)
        document.body.classList.remove('select-none')
        if (element) {
          element.classList.remove('cursor-grabbing')
          element.classList.add('cursor-grab')
        }
      }
    }
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      // 이벤트 리스너 정리
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseup', handleMouseUpOrLeave)
      element.removeEventListener('mouseleave', handleMouseUpOrLeave)
      element.removeEventListener('wheel', handleWheel)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('click', handleClick, true)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.body.classList.remove('select-none')
    }
  }, [isDown, startX, scrollLeft, isDragging])

  return { ref, isDragging }
}
