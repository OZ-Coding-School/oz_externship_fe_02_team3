import { useMemo, useState } from 'react'
import { FileUp } from 'lucide-react'
import DottedBox from './uploadbox-ui/DottedBox'
import FileList from './uploadbox-ui/FileList'
import useUploader from './uploadbox-ui/useUploader'
import { useToast } from '@components/commons/toast'

interface PresetFile {
  id: number
  name: string
  url: string
}

interface FileWithPreview extends File {
  preview?: string
  __preset?: boolean
}

interface FileUploadBoxProps {
  defaultFiles?: PresetFile[]
}

export function FileUploadBox({ defaultFiles = [] }: FileUploadBoxProps) {
  const toast = useToast()

  const { files, state, getRootProps, getInputProps, removeAt } = useUploader({
    accept: { '*/*': [] },
    maxFiles: 3,
    onError: (m) =>
      toast.error({
        title: '업로드 오류',
        content: m,
      }),
  })

  const [presetFiles, setPresetFiles] = useState<PresetFile[]>(defaultFiles)

  const adaptedPreset = useMemo<FileWithPreview[]>(
    () =>
      presetFiles.map((presentFile) => {
        const file = new File([''], presentFile.name, {
          type: 'application/octet-stream',
          lastModified: 0,
        }) as FileWithPreview
        file.preview = presentFile.url
        file.__preset = true
        return file
      }),
    [presetFiles]
  )

  const combinedFiles = useMemo<FileWithPreview[]>(
    () => [...adaptedPreset, ...(files as FileWithPreview[])],
    [adaptedPreset, files]
  )

  const handleRemove = (index: number) => {
    if (index < adaptedPreset.length) {
      setPresetFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      removeAt(index - adaptedPreset.length)
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
            최대 3개 파일, 각 5MB 이하
          </p>
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
