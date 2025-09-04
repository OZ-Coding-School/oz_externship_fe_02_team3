import Button from '@src/components/Button'
import BackButton from '../common/BackButton'
import { Plus as PlusIcon } from 'lucide-react'

const RecManageHeader = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      {/* 공고관리 header Left */}
      <div className="flex h-16 w-[340.77px] items-center justify-center">
        <BackButton />
        <div className="ml-4 flex h-full w-[284.77px] flex-col">
          <p className="text-[30px] leading-9 font-bold text-[#111827]">
            공고 관리
          </p>
          <p className="text-[16px] leading-6 font-normal text-[#4B5563]">
            내가 등록한 스터디 구인 공고를 관리하세요
          </p>
        </div>
      </div>

      {/* 공고관리 header right */}
      <div>
        <Button
          buttonInnerText="새 공고 작성하기"
          icon={PlusIcon}
          variant="filled"
        />
      </div>
    </div>
  )
}

export default RecManageHeader
