import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'

export type Uploaded = File & { preview?: string }

export interface UseUploaderOptions {
  accept?: Accept
  maxFiles?: number // 합계 제한
  maxSize?: number
  multiple?: boolean
  createPreview?: boolean // 이미지 미리보기 URL 생성 여부
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
}: UseUploaderOptions) {
  const [files, setFiles] = useState<Uploaded[]>([])

  // 최신 files 참조용 ref
  const filesRef = useRef<Uploaded[]>([])
  useEffect(() => {
    filesRef.current = files
  }, [files])

  const onDrop = useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      // 용량/형식 오류 안내
      if (rejections.length) {
        const err = rejections[0]?.errors?.[0]
        if (err?.code === 'file-too-large') {
          onError?.(
            `파일 용량 초과 (최대 ${(maxSize / 1024 / 1024).toFixed(0)}MB)`
          )
        } else if (err?.message) {
          onError?.(err.message)
        }
      }
      if (!accepted.length) return

      const current = filesRef.current

      const remain = Math.max(0, maxFiles - current.length)
      const allowed = multiple
        ? accepted.slice(0, remain)
        : accepted.slice(0, 1)
      const overflow = accepted.length - allowed.length

      if (!allowed.length) {
        onError?.(`최대 ${maxFiles}개까지 업로드 가능`)
        return
      }
      if (overflow > 0) {
        onError?.(
          `최대 ${maxFiles}개까지 업로드 가능 (추가 ${overflow}개는 제외됨)`
        )
      }

      // preview 부착
      const withPreview: Uploaded[] = allowed.map((f) =>
        Object.assign(f, {
          preview: createPreview ? URL.createObjectURL(f) : undefined,
        })
      )

      setFiles((prev) =>
        multiple ? [...prev, ...withPreview] : [withPreview[0]]
      )
    },
    [maxFiles, maxSize, multiple, createPreview, onError]
  )

  // Dropzone 설정 (maxFiles는 주지 않음: 합계 제한은 우리가 관리)
  const dz = useDropzone({
    onDrop,
    accept,
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

  // 삭제 시 preview URL 정리
  const removeAt = (i: number) =>
    setFiles((prev) => {
      const target = prev[i]
      if (target?.preview) URL.revokeObjectURL(target.preview)
      return prev.filter((_, idx) => idx !== i)
    })

  // 전체 초기화
  const reset = () =>
    setFiles((prev) => {
      prev.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
      return []
    })

  // 언마운트 시 preview URL 정리
  useEffect(() => {
    return () => {
      filesRef.current.forEach(
        (f) => f.preview && URL.revokeObjectURL(f.preview)
      )
    }
  }, [])

  return {
    files,
    setFiles,
    removeAt,
    reset,
    state,
    getRootProps: dz.getRootProps,
    getInputProps: dz.getInputProps,
    open: dz.open,
  }
}
