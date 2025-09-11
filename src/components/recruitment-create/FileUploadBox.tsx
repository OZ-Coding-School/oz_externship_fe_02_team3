import { FileUp } from 'lucide-react'
import DottedBox from './uploadbox-ui/DottedBox'
import FileList from './uploadbox-ui/FileList'
import useUploader from './uploadbox-ui/useUploader'

export function FileUploadBox() {
  const { files, state, getRootProps, getInputProps, removeAt } = useUploader({
    accept: { '*/*': [] },
    maxFiles: 3,
    onError: (m) => alert(m),
  })

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

        {files.length > 0 && (
          <div className="mx-auto mt-4 max-h-48 overflow-y-auto">
            <FileList
              files={files}
              onRemove={removeAt}
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
