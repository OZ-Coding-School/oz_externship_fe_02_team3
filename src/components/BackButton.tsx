import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] hover:bg-[#cbcdcf]"
    >
      <ArrowLeft size={20} strokeWidth={2} />
    </button>
  )
}

export default BackButton
