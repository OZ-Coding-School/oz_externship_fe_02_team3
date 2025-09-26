import { useMemo, useState } from 'react'
import StudyIntroMarkdown from './StudyIntroMarkdown'
import { STUDY_INTRO_PLACEHOLDER } from '@src/constants/studyintroplaceholder'
import { countMdImages } from './markdown-ui/mdImages'

interface RecCreateContentSectionProps {
  draftId: string
  onContentChange?: (v: string) => void
}

const MAX_IMAGES = 5
const PLACEHOLDER = STUDY_INTRO_PLACEHOLDER

export default function RecCreateContentSection({
  draftId,
  onContentChange,
}: RecCreateContentSectionProps) {
  const [markDown, setMarkDown] = useState('')
  const usedCount = useMemo(() => countMdImages(markDown), [markDown])

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
      <p className="text-[20px] leading-7 font-semibold">공고 내용</p>

      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        공고 내용
        <span className="text-danger-500" aria-label="필수 입력">
          {' '}
          *
        </span>
      </label>

      <div className="flex justify-between text-[12px] font-normal text-gray-500">
        <p>마크다운 문법을 사용할 수 있습니다</p>
        <p>
          이미지 {usedCount}/{MAX_IMAGES}개
        </p>
      </div>

      <label className="mt-2 mb-2 block text-sm leading-5 font-medium text-gray-700">
        스터디 그룹 소개(선택사항)
      </label>

      <StudyIntroMarkdown
        draftId={draftId}
        value={markDown}
        onChange={(v: string) => {
          setMarkDown(v)
          onContentChange?.(v)
        }}
        placeholder={PLACEHOLDER}
        height={320}
      />

      <div className="pt-2 text-[12px] leading-4 font-normal text-gray-500">
        <p>• 마크다운 문법: **굵게**, *기울임*, # 제목, - 목록 등</p>
        <p>• 이미지 추가: ![설명](이미지URL) - 최대 5개, 각 5MB 이하</p>
      </div>
    </div>
  )
}
