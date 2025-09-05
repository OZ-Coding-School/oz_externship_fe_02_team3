import { ArrowLeft as ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/recruitment')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors delay-0 duration-300 hover:cursor-pointer hover:bg-gray-200"
    >
      <ArrowLeftIcon size={20} strokeWidth={2} />
    </button>
  )
}
