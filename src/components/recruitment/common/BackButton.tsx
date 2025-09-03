import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

function BackButton() {
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] hover:cursor-pointer hover:bg-[#cbcdcf]"
    >
      <ArrowLeft size={20} strokeWidth={2} />
    </button>
  )
}

export default BackButton
