import { useState } from 'react'
import { supa } from '@src/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface UploadedFile {
  key: string
  url: string
  name: string
}

const BUCKET = import.meta.env.VITE_SUPA_BUCKET as string

export function useSupabaseFileStorage() {
  const [isUploading, setIsUploading] = useState(false)

  async function uploadOne(
    file: File,
    draftId: string,
    prefix = 'files'
  ): Promise<UploadedFile> {
    setIsUploading(true)
    try {
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
      const key = `temp/${draftId}/${prefix}/${uuidv4()}.${ext}`
      const { error } = await supa.storage.from(BUCKET).upload(key, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      })
      if (error) throw error
      const { data } = supa.storage.from(BUCKET).getPublicUrl(key)
      return { key, url: data.publicUrl, name: file.name }
    } finally {
      setIsUploading(false)
    }
  }

  async function removeKeys(keys: string[]) {
    if (!keys.length) return
    await supa.storage.from(BUCKET).remove(keys)
  }

  return { uploadOne, removeKeys, isUploading }
}
