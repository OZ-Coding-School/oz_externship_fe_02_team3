import { useCallback } from 'react'
import { useImageUploader } from './useImageUploader'
import { useMdImageDnDPaste } from './useMdImageDnDPaste'
import { useMdCommands } from './useMdCommands'

type Mode = 'mock' | 's3'

interface Options {
  onChange: (v: string) => void
  mode?: Mode
  s3BaseUrl?: string
  maxSize?: number
  onError?: (msg: string) => void
}

export function useMarkdownImageUpload({
  onChange,
  mode = 'mock',
  s3BaseUrl,
  maxSize = 10 * 1024 * 1024,
  onError,
}: Options) {
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
    mode,
    s3BaseUrl,
    maxSize,
    onError,
  })

  // 파일 → 업로드 → 마크다운 이미지 삽입
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) return
      const { url } = await upload(file) // Promise<UploadResult>
      const alt = file.name.replace(/\.(png|jpe?g|gif|webp|svg|bmp|heic)$/i, '')
      insertImage(url, alt)
    },
    [upload, insertImage]
  )

  const { onDrop, onDragOver, onPaste } = useMdImageDnDPaste(handleFileUpload)

  return {
    taRef,
    onDrop,
    onDragOver,
    onPaste,
    wrapInline,
    insertLink,
    toggleH1,
    toggleUl,
    toggleOl,
    isUploading,
  }
}
