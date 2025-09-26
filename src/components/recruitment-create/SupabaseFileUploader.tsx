import { useEffect, useMemo } from 'react'
import { FileUp } from 'lucide-react'
import DottedBox from './uploadbox-ui/DottedBox'
import FileList from './uploadbox-ui/FileList'
import useUploader from './uploadbox-ui/useUploader'
import { useToast } from '@components/commons/toast'
import { useSupabaseFileStorage } from './useSupabaseFileStorage'

const MAX_FILES = 3

interface PresetFile {
  id: string
  name: string
  url: string
  key?: string
}

interface FileWithPreview extends File {
  preview?: string
  __preset?: boolean
  __uploaded?: boolean
}

interface FileUploadBoxProps {
  draftId: string
  defaultFiles?: PresetFile[]
  onChange?: (files: PresetFile[]) => void
}

function dedupe(files: PresetFile[]) {
  const seen = new Set<string>()
  const out: PresetFile[] = []
  for (const f of files) {
    const k = f.key ?? `${f.url}#${f.name}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push(f)
  }
  return out
}

export function SupabaseFileuploader({
  draftId,
  defaultFiles = [],
  onChange,
}: FileUploadBoxProps) {
  const toast = useToast()
  const { uploadOne, removeKeys, isUploading } = useSupabaseFileStorage()

  const { files, state, getRootProps, getInputProps, removeAt } = useUploader({
    accept: { '*/*': [] },
    maxFiles: MAX_FILES,
    maxSize: 5 * 1024 * 1024,
    onError: (m) => toast.error({ title: '업로드 오류', content: m }),
  })

  const adaptedPreset = useMemo<FileWithPreview[]>(
    () =>
      defaultFiles.map((pf) => {
        const f = new File([''], pf.name, {
          type: 'application/octet-stream',
          lastModified: 0,
        }) as FileWithPreview
        f.preview = pf.url
        f.__preset = true
        return f
      }),
    [defaultFiles]
  )

  const combinedFiles = adaptedPreset

  useEffect(() => {
    const locals = (files as FileWithPreview[]).filter(
      (f) => !f.__preset && !f.__uploaded
    )
    if (locals.length === 0) return

    const capacity = MAX_FILES - defaultFiles.length
    if (capacity <= 0) {
      toast.warning({
        title: '업로드 제한',
        content: `파일은 최대 ${MAX_FILES}개까지 업로드할 수 있어요.`,
      })
      for (let i = files.length - 1; i >= 0; i--) removeAt(i)
      return
    }

    const allowed = locals.slice(0, capacity)
    const overflow = locals.length - allowed.length
    if (overflow > 0) {
      toast.warning({
        title: '업로드 제한',
        content: `최대 ${MAX_FILES}개까지 가능해서 ${overflow}개는 제외했어요.`,
      })
    }

    ;(async () => {
      try {
        const uploaded: PresetFile[] = []
        for (const f of allowed) {
          const { key, url, name } = await uploadOne(f, draftId, 'files')
          uploaded.push({ id: key, name, url, key })
        }
        const next = dedupe([...defaultFiles, ...uploaded])
        onChange?.(next)
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : '파일 업로드 중 오류가 발생했습니다.'
        toast.error({ title: '업로드 실패', content: msg })
      } finally {
        for (let i = files.length - 1; i >= 0; i--) removeAt(i)
      }
    })()
  }, [files, defaultFiles, uploadOne, draftId, removeAt, onChange, toast])

  const handleRemove = async (index: number) => {
    const target = defaultFiles[index]
    const next = defaultFiles.filter((_, i) => i !== index)
    onChange?.(next)
    if (target?.key) {
      try {
        await removeKeys([target.key])
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <DottedBox
      state={state}
      className="h-[282px] !p-0"
      {...getRootProps({ role: 'button', tabIndex: 0 })}
    >
      <input {...getInputProps()} />

      <div className="w-full p-6 sm:p-8">
        <div className="text-center select-none">
          <FileUp className="mx-auto mb-2 h-8 w-8 text-gray-500 opacity-70" />
          <p className="text-sm font-medium text-gray-500">
            파일을 드래그하거나 클릭하여 업로드
          </p>
          <p className="mt-1 text-xs text-gray-500">
            최대 {MAX_FILES}개 파일, 각 5MB 이하
          </p>
          {isUploading && (
            <p className="mt-1 text-xs text-gray-500">업로드 중…</p>
          )}
        </div>

        {combinedFiles.length > 0 && (
          <div className="mx-auto mt-4 max-h-48 overflow-y-auto">
            <FileList
              files={combinedFiles}
              onRemove={handleRemove}
              showPreview
              thumbSize={24}
              dense
            />
          </div>
        )}
      </div>
    </DottedBox>
  )
}
