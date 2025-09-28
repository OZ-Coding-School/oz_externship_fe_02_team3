import { useEffect, useMemo, useState } from 'react'
import RecEditPriceInput from './RecEditPriceInput'
import { SupabaseFileuploader } from '../recruitment-create/SupabaseFileUploader'
import TagSection from '../recruitment-create/tag-ui/TagSection'
export interface PresetFileIn {
  id: string
  name: string
  url: string
  key?: string
}

interface RecEditAdditionalInfoProps {
  draftId: string
  defaultPrice?: string
  onPriceChange: (raw: string) => void
  defaultFiles?: PresetFileIn[]
}

export default function RecEditAdditionalInfo({
  draftId,
  defaultPrice,
  onPriceChange,
  defaultFiles = [],
}: RecEditAdditionalInfoProps) {
  const [price, setPrice] = useState('')

  useEffect(() => setPrice(defaultPrice ?? ''), [defaultPrice])

  const normalized: PresetFileIn[] = useMemo(
    () =>
      defaultFiles.map((f) => ({
        ...f,
        id: String(f.id),
        key: f.key !== undefined ? String(f.key) : undefined,
      })),
    [defaultFiles]
  )

  const [attachments, setAttachments] = useState<PresetFileIn[]>(normalized)
  useEffect(() => setAttachments(normalized), [normalized])

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">추가 정보</p>

      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        예상 결제 비용 (원)
      </label>
      <RecEditPriceInput
        value={price}
        onChange={(raw) => {
          setPrice(raw)
          onPriceChange(raw)
        }}
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
          onChange={setAttachments}
        />
      </div>
    </div>
  )
}
