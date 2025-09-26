import RecEditPriceInput from '../recruitment-edit/RecEditPriceInput'
import { SupabaseFileuploader } from './SupabaseFileUploader'
import TagSection from './tag-ui/TagSection'
import { useState } from 'react'

interface PresetFile {
  id: string
  name: string
  url: string
  key?: string
}

interface Props {
  draftId: string
  derivedPrice?: string
  override: string | null
  onChangeOverride: (raw: string) => void
  defaultFiles?: PresetFile[]
}

const formatPrice = (s?: string) =>
  s ? new Intl.NumberFormat('ko-KR').format(Number(s)) : ''

export default function RecCreateAdditionalInfo({
  draftId,
  derivedPrice = '',
  override,
  onChangeOverride,
  defaultFiles = [],
}: Props) {
  const inputValue = override === null ? derivedPrice : override
  const valueForInput = override === '' ? '' : inputValue

  let placeholder = '미입력시 스터디 그룹 비용 자동 계산'
  if (override === '') {
    placeholder = formatPrice(derivedPrice) || '금액 입력'
  }

  const [attachments, setAttachments] = useState<PresetFile[]>(defaultFiles)

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
        <SupabaseFileuploader
          draftId={draftId}
          defaultFiles={attachments}
          onChange={(files) => setAttachments(files)}
        />
      </div>
    </div>
  )
}
