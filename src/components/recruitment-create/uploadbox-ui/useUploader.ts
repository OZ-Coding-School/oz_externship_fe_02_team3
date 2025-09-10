import { useCallback, useState } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'

export type Uploaded = File & { preview?: string }

export interface useUploaderOptions {
  accept?: Accept
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  createPreview?: boolean // 아직 생성되지 않은 경우 미리보기가 안보이도록 세팅
  disabled?: boolean
  onError?: (msg: string) => void
}

export default function useUploader({
  accept,
  maxFiles = 3,
  maxSize = 5 * 1024 * 1024,
  multiple = true,
  createPreview = false,
  disabled,
  onError,
}: useUploaderOptions) {
  const [files, setFiles] = useState<Uploaded[]>([])

  const onDrop = useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      // 기존 값도 포함해서 체크
      if (rejections.length) {
        const err = rejections[0]?.errors?.[0]
        const msg =
          err?.code === 'file-too-large'
            ? `파일 용량 초과 (최대 ${(maxSize / 1024 / 1024).toFixed(0)}MB)`
            : err?.code === 'too-many-files'
              ? `최대 ${maxFiles}개까지 업로드 가능`
              : '허용되지 않는 형식입니다.'
        onError?.(msg)
      }
      if (!accepted.length) return

      // 1) 중복 제거 (이름+크기 기준)
      const deduped = accepted.filter(
        (file) =>
          !files.some((e) => e.name === file.name && e.size === file.size)
      )

      // 2) 총 개수 제한
      const remain = Math.max(0, maxFiles - files.length)
      const sliced = multiple ? deduped.slice(0, remain) : deduped.slice(0, 1)

      if (!sliced.length) {
        onError?.(`최대 ${maxFiles}개까지 업로드 가능`)
        return
      }

      const withPreview: Uploaded[] = sliced.map((f) =>
        Object.assign(f, {
          preview: createPreview ? URL.createObjectURL(f) : undefined,
        })
      )
      const next = multiple ? [...files, ...withPreview] : [withPreview[0]]
      setFiles(next)
    },
    [files, maxFiles, maxSize, multiple, createPreview, onError]
  )

  // 라이브러리에서 필요한 부분만 꺼내 쓰기
  const dz = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    multiple,
    disabled,
  })

  const state: 'idle' | 'active' | 'reject' | 'disabled' = disabled
    ? 'disabled'
    : dz.isDragReject
      ? 'reject'
      : dz.isDragActive || dz.isFocused
        ? 'active'
        : 'idle'

  const removeAt = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i))

  return {
    files,
    setFiles,
    removeAt,
    state,
    getRootProps: dz.getRootProps,
    getInputProps: dz.getInputProps,
    open: dz.open,
  }
}
