import { FileUploadBox } from './FileUploadBox'
import PriceInput from './PriceInput'
import TagBox from './tag-ui/TagBox'

export default function RecCreateAdditionalInfo() {
  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">추가 정보</p>
      {/* 예상 결제 비용 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        예상 결제 비용 (원)
      </label>
      <PriceInput />
      <div className="mt-6">
        <TagBox />
      </div>
      <div className="mt-6">
        <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
          참고 파일 업로드 (선택사항)
        </label>
        <FileUploadBox />
      </div>
    </div>
  )
}
