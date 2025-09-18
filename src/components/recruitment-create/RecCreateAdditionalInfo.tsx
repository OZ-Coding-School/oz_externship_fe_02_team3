import RecEditPriceInput from '../recruitment-edit/RecEditPriceInput'
import { FileUploadBox } from './FileUploadBox'
import PriceInput from './PriceInput'
import TagSection from './tag-ui/TagSection'

interface PresetFile {
  id: number
  name: string
  url: string
}

interface Props {
  derivedPrice?: string
  override: string | null
  onChangeOverride: (raw: string) => void
  defaultFiles?: PresetFile[]
}

const formatPrice = (s?: string) =>
  s ? new Intl.NumberFormat('ko-KR').format(Number(s)) : ''

export default function RecCreateAdditionalInfo({
  derivedPrice = '',
  override,
  onChangeOverride,
  defaultFiles,
}: Props) {
  const inputValue = override === null ? derivedPrice : override
  const valueForInput = override === '' ? '' : inputValue

  let placeholder = '미입력시 스터디 그룹 비용 자동 계산'
  if (override === '') {
    placeholder = formatPrice(derivedPrice) || '금액 입력'
  }

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">추가 정보</p>

      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        예상 결제 비용 (원)
      </label>
      <RecEditPriceInput
        value={valueForInput}
        onChange={onChangeOverride}
        placeholder={placeholder}
      />

      <div className="mt-6">
        <TagSection />
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
