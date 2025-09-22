import { useState } from 'react'

export interface UploadResult {
  url: string
  width?: number
  height?: number
}

export interface Uploader {
  upload(file: File): Promise<UploadResult>
}

function createMockUploader(): Uploader {
  return {
    async upload(file: File) {
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 할 수 있습니다.')
      }

      const url = URL.createObjectURL(file)

      const displayImgs = await new Promise<{ w?: number; h?: number }>(
        (res) => {
          const img = new Image()
          img.onload = () => res({ w: img.width, h: img.height })
          img.onerror = () => res({})
          img.src = url
        }
      )

      return { url, width: displayImgs.w, height: displayImgs.h }
    },
  }
}

function createS3Uploader(baseUrl = '/api/uploads'): Uploader {
  return {
    async upload(file: File) {
      const presignRes = await fetch(
        `${baseUrl}/presign?filename=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type)}`
      )
      if (!presignRes.ok) throw new Error('업로드 URL을 받는 데 실패했습니다.')
      const { url, fields, putUrl, getUrl } = await presignRes.json()
      if (url && fields) {
        const form = new FormData()
        Object.entries(fields).forEach(([k, v]) => form.append(k, v as string))
        form.append('file', file)
        const uploadRes = await fetch(url, { method: 'POST', body: form })
        if (!uploadRes.ok) throw new Error('S3 업로드 실패')
        return { url: getUrl ?? `${url}/${fields.key}` }
      }
      if (putUrl) {
        const uploadRes = await fetch(putUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })
        if (!uploadRes.ok) throw new Error('S3 업로드 실패')
        return { url: getUrl ?? putUrl.split('?')[0] }
      }
      throw new Error('서버 응답 형식이 올바르지 않습니다.')
    },
  }
}

export function useImageUploader(opts?: {
  mode?: 'mock' | 's3'
  s3BaseUrl?: string
  maxSize?: number
  onError?: (msg: string) => void
}) {
  const [isUploading, setUploading] = useState(false)
  const {
    mode = 'mock',
    s3BaseUrl,
    maxSize = 5 * 1024 * 1024,
    onError,
  } = opts || {}
  const impl: Uploader =
    mode === 's3' ? createS3Uploader(s3BaseUrl) : createMockUploader()

  const upload: (file: File) => Promise<UploadResult> = async (file) => {
    try {
      if (file.size > maxSize)
        throw new Error('파일 크기가 허용 용량을 초과했습니다.')
      setUploading(true)
      const res = await impl.upload(file)
      return res
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : '이미지 업로드 중 오류가 발생했습니다.'
      onError?.(msg)
      throw e
    } finally {
      setUploading(false)
    }
  }

  return { upload, isUploading }
}
