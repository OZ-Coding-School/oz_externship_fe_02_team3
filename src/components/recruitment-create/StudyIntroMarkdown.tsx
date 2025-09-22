import { useCallback, useState } from 'react'
import MdToolbar from './markdown-ui/MdToolbar'
import MdPreview from './markdown-ui/MdPreview'
import MdFooter from './markdown-ui/MdFooter'
import { useMdCommands } from './markdown-ui/useMdCommands'
import { useImageUploader } from './markdown-ui/useImageUploader'
import { useMdImageDnDPaste } from './markdown-ui/useMdImageDnDPaste'
import { countMdImages } from './markdown-ui/mdImages'

interface StudyIntroProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  height?: number
}

const PLACEHOLDER =
  '# 스터디 소개\nReact 실무 프로젝트를 함께 진행할 팀원을 모집합니다!\n\n## 스터디 내용\n- React 기초부터 실무 적용까지\n- 실제 프로젝트 개발 경험\n- 코드 리뷰 및 피드백'

export default function StudyIntroMarkdown({
  value,
  onChange,
  placeholder = PLACEHOLDER,
  height = 282,
}: StudyIntroProps) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')

  const {
    taRef,
    wrapInline,
    insertLink,
    toggleH1,
    toggleUl,
    toggleOl,
    insertImage,
  } = useMdCommands(onChange)

  const { upload, isUploading } = useImageUploader({
    mode: 'mock',
    maxSize: 10 * 1024 * 1024,
    onError: (m) => alert(m),
  })

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) return
      const { url } = await upload(file)
      const alt = file.name.replace(/\.(png|jpe?g|gif|webp|svg|bmp|heic)$/i, '')
      insertImage(url, alt)
    },
    [upload, insertImage]
  )

  const { onDrop, onDragOver, onPaste } = useMdImageDnDPaste(handleFileUpload, {
    max: 5,
    getCount: () => countMdImages(value),
    onLimit: (left) => {
      if (left <= 0) alert('이미지는 최대 5장까지 가능합니다.')
    },
  })

  const views = {
    edit: (
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ height }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaste={onPaste}
        className="block w-full resize-none border-t border-gray-200 bg-white p-3 text-sm outline-none"
      />
    ),
    preview: <MdPreview embedded value={value} height={height} />,
  } as const

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <MdToolbar
          tab={tab}
          setTab={setTab}
          onBold={() => wrapInline('**')}
          onItalic={() => wrapInline('*')}
          onCode={() => wrapInline('`')}
          onLink={insertLink}
          onH1={toggleH1}
          onBullet={toggleUl}
          onNumber={toggleOl}
        />
        {views[tab]}

        <MdFooter>
          <div className="flex flex-wrap items-center gap-2">
            <span>마크다운 문법을 사용할 수 있습니다.</span>
            <strong>**굵게**</strong>
            <em>*기울임*</em>
            <span>`코드`</span>
            <span>[링크](URL)</span>
            <span>## 제목</span>
            <span className="ml-auto">
              {isUploading ? '이미지 업로드 중…' : ''}
            </span>
          </div>
        </MdFooter>
      </div>
    </div>
  )
}
