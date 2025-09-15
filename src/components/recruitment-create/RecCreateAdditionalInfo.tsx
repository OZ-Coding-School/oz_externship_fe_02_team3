import { FileUploadBox } from './FileUploadBox'
import TagBox from './tag-ui/TagBox'

export default function RecCreateAdditionalInfo() {
  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-[#111827]">
      <p className="text-[20px] leading-7 font-semibold">추가 정보</p>
      {/* 예상 결제 비용 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        예상 결제 비용 (원)
      </label>
      <input
        type="text"
        className="w-full rounded-[8px] border border-gray-300 px-[17px] py-[13px]"
        placeholder="미입력시 강의 비용 자동 계산"
      />
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
