import { FileUploadBox } from '../recruitment-create/FileUploadBox'
import PriceInput from '../recruitment-create/PriceInput'
import TagBox from '../recruitment-create/tag-ui/TagBox'

interface PresetFile {
  id: number
  name: string
  url: string
}

interface RecEditAdditionalInfoProps {
  defaultPrice?: string
  onPriceChange: (raw: string) => void
  defaultFiles?: PresetFile[]
}

export default function RecEditAdditionalInfo({
  defaultPrice,
  onPriceChange,
  defaultFiles,
}: RecEditAdditionalInfoProps) {
  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">추가 정보</p>
      {/* 예상 결제 비용 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        예상 결제 비용 (원)
      </label>
      <PriceInput defaultValue={defaultPrice} onChange={onPriceChange} />
      <div className="mt-6">
        <TagBox />
      </div>
      <div className="mt-6">
        <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
          참고 파일 업로드 (선택사항)
        </label>
        <FileUploadBox defaultFiles={defaultFiles} />
      </div>
    </div>
  )
}
