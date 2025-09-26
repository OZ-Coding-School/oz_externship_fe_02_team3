import { supa } from '@src/lib/supabase'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const BUCKET = import.meta.env.VITE_SUPA_BUCKET as string

export function useSupaBaseUploader({
  maxSize = 10 * 1024 * 1024,
  onError,
  draftId = 'anon-draft',
}: {
  maxSize?: number
  onError?: (m?: string) => void
  draftId?: string
}) {
  const [isUploading, setUploading] = useState(false)

  async function upload(file: File) {
    try {
      setUploading(true)
      if (file.size > maxSize) throw new Error('파일 용량 제한을 초과했습니다.')
      const ext = (file.name.split('.').pop() || 'png').toLowerCase()
      const key = `temp/${draftId}/${uuidv4()}.${ext}`

      const { error } = await supa.storage.from(BUCKET).upload(key, file, {
        contentType: file.type,
        upsert: false,
      })
      if (error) throw error

      const { data } = supa.storage.from(BUCKET).getPublicUrl(key)
      const url = `${data.publicUrl}?assetId=${encodeURIComponent(key)}`
      return { url, key }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : '업로드에 실패했습니다.'
      onError?.(msg)
      throw err
    } finally {
      setUploading(false)
    }
  }

  async function deleteMany(keys: string[]) {
    if (!keys.length) return
    await supa.storage.from(BUCKET).remove(keys)
  }

  return { upload, isUploading, deleteMany }
}
