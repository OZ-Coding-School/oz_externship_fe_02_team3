import { ArrowLeft as ArrowLeftICON } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] transition-colors delay-200 duration-300 hover:cursor-pointer hover:bg-[#cbcdcf] hover:delay-100"
    >
      <ArrowLeftICON size={20} strokeWidth={2} />
    </button>
  )
}

export default BackButton
