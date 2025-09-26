import { useCallback, useState } from 'react'
import MdToolbar from './markdown-ui/MdToolbar'
import MdPreview from './markdown-ui/MdPreview'
import MdFooter from './markdown-ui/MdFooter'
import { useMdCommands } from './markdown-ui/useMdCommands'
import { useMdImageDnDPaste } from './markdown-ui/useMdImageDnDPaste'
import { countMdImages } from './markdown-ui/mdImages'
import { useToast } from '@components/commons/toast'
import { useSupaBaseUploader } from './markdown-ui/useSupaBaseUploader'

interface StudyIntroProps {
  draftId: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  height?: number
}

const MAX_IMAGES = 5
const PLACEHOLDER =
  '# 스터디 소개\nReact 실무 프로젝트를 함께 진행할 팀원을 모집합니다!\n\n## 스터디 내용\n- React 기초부터 실무 적용까지\n- 실제 프로젝트 개발 경험\n- 코드 리뷰 및 피드백'

export default function StudyIntroMarkdown({
  draftId,
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

  const toast = useToast()

  const { upload, isUploading } = useSupaBaseUploader({
    draftId,
    maxSize: 10 * 1024 * 1024,
    onError: (m) =>
      toast.error({
        title: '업로드 실패',
        content: m || '이미지 업로드 중 오류가 발생했습니다.',
      }),
  })

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error({
          title: '이미지 파일만 업로드',
          content: 'PNG, JPG, GIF, WEBP 등을 지원해요.',
        })
        return
      }

      const left = MAX_IMAGES - countMdImages(value, true)
      if (left <= 0) {
        toast.warning({
          title: '이미지 업로드 제한',
          content: `이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`,
        })
        return
      }

      const { url } = await upload(file)
      const alt = file.name.replace(/\.(png|jpe?g|gif|webp|svg|bmp|heic)$/i, '')
      insertImage(url, alt)
    },
    [upload, insertImage, value, toast]
  )

  const { onDrop, onDragOver, onPaste } = useMdImageDnDPaste(handleFileUpload, {
    max: MAX_IMAGES,
    getCount: () => countMdImages(value, true),
    onLimit: (left) =>
      toast.warning({
        title: '이미지 업로드 제한',
        content:
          left <= 0
            ? `이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`
            : `남은 업로드 가능 수: ${left}장`,
      }),
  })

  const isImageByName = (name?: string) =>
    !!name && /\.(png|jpe?g|gif|webp|bmp|svg|heic)$/i.test(name)

  const onDropWithToast = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      const dt = e.dataTransfer
      if (dt) {
        const files = dt.files?.length
          ? Array.from(dt.files)
          : dt.items
            ? Array.from(dt.items)
                .map((it) => (it.kind === 'file' ? it.getAsFile() : null))
                .filter((f): f is File => !!f)
            : []

        const hasNonImage = files.some(
          (f) => !(f.type?.startsWith('image/') || isImageByName(f.name))
        )
        if (hasNonImage) {
          toast.error({
            title: '이미지 파일만 업로드',
            content: 'PNG, JPG, GIF, WEBP 등을 지원해요.',
          })
        }
      }
      onDrop(e)
    },
    [onDrop, toast]
  )

  const onPasteWithToast = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData?.items
      if (items?.length) {
        const fileItems = Array.from(items).filter((i) => i.kind === 'file')
        if (fileItems.length) {
          const hasNonImage = fileItems.some(
            (i) => !i.type.startsWith('image/')
          )
          if (hasNonImage) {
            toast.error({
              title: '이미지 파일만 업로드',
              content: 'PNG, JPG, GIF, WEBP 등을 지원해요.',
            })
          }
        }
      }
      onPaste(e)
    },
    [onPaste, toast]
  )

  const views = {
    edit: (
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ height }}
        onDrop={onDropWithToast}
        onDragOver={onDragOver}
        onPaste={onPasteWithToast}
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
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
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
