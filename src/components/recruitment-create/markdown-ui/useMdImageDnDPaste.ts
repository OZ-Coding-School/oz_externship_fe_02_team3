import { useCallback } from 'react'
import { takeUntilMax } from './mdImages'

interface Opts {
  max?: number
  getCount?: () => number
  onLimit?: (left: number) => void
}

export function useMdImageDnDPaste(
  onFile: (file: File) => Promise<void>,
  opts: Opts = {}
) {
  const { max = Number.POSITIVE_INFINITY, getCount, onLimit } = opts

  const getLeft = useCallback(() => {
    const cur = getCount?.() ?? 0
    return Math.max(0, max - cur)
  }, [getCount, max])

  const looksImage = (f: File) =>
    f.type?.startsWith('image/') ||
    /\.(png|jpe?g|gif|webp|bmp|svg|heic)$/i.test(f.name || '')

  const handleFiles = useCallback(
    async (files: File[] | FileList) => {
      const left = getLeft()
      if (left <= 0) {
        onLimit?.(0)
        return
      }

      const all = Array.from(files).filter(looksImage)
      if (all.length === 0) return

      const picked = takeUntilMax(all, left)
      const skipped = all.length - picked.length

      for (const f of picked) {
        await onFile(f)
      }

      if (skipped > 0 || picked.length === 0) {
        onLimit?.(Math.max(0, left - picked.length))
      }
    },
    [getLeft, onFile, onLimit]
  )

  const handleUrlFallback = useCallback(
    async (e: React.DragEvent<HTMLTextAreaElement>) => {
      const left = getLeft()
      if (left <= 0) {
        onLimit?.(0)
        return false
      }
      const dt = e.dataTransfer
      const uri = dt.getData('text/uri-list') || dt.getData('text/plain') || ''
      if (!/^https?:\/\//i.test(uri)) return false
      try {
        const resp = await fetch(uri, { mode: 'cors' })
        const blob = await resp.blob()
        const file = new File([blob], `dropped-${Date.now()}.png`, {
          type: blob.type || 'image/*',
        })
        await onFile(file)
        return true
      } catch {
        return false
      }
    },
    [getLeft, onFile, onLimit]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      const dt = e.dataTransfer
      if (!dt) return

      if (dt.files?.length) {
        void handleFiles(dt.files)
        return
      }

      if (dt.items?.length) {
        const files: File[] = []
        for (const it of Array.from(dt.items)) {
          if (it.kind === 'file') {
            const f = it.getAsFile()
            if (f) files.push(f)
          }
        }
        if (files.length) {
          void handleFiles(files)
          return
        }
      }

      void handleUrlFallback(e)
    },
    [handleFiles, handleUrlFallback]
  )

  const onDragOver = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
  }, [])

  const onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData?.items
      if (!items?.length) return

      const files = Array.from(items)
        .filter((i) => i.type.startsWith('image/'))
        .map((i) => i.getAsFile())
        .filter((f): f is File => !!f)

      if (!files.length) return

      e.preventDefault()
      void handleFiles(files)
    },
    [handleFiles]
  )

  return { onDrop, onDragOver, onPaste }
}
