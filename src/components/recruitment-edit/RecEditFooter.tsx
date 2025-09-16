import { MousePointer2 as MousePointer2Icon } from 'lucide-react'
import Button from '../commons/button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants/routes'

export default function RecEditFooter() {
  const navigate = useNavigate()
  return (
    <div className="mb-12 w-full max-w-[832px] border-t-1 border-gray-200 text-gray-900">
      <div className="flex justify-end gap-4 pt-[25px]">
        <Button
          buttonInnerText="취소"
          size="base"
          variant="outline"
          onClick={() => navigate(`${ROUTES.RECRUITMENT_MANAGE}`)}
        />
        <Button
          buttonInnerText="공고 수정하기"
          icon={MousePointer2Icon}
          iconClassName="rotate-[90deg]"
          size="base"
          iconSize="sm"
        />
      </div>
    </div>
  )
}
