import { Plus as PlusIcon, ImagePlus as ImagePlusIcon } from 'lucide-react'
import DottedBox from './uploadbox-ui/DottedBox'
import useUploader, { type Uploaded } from './uploadbox-ui/useUploader'

export function ImageUploadBox() {
  const { files, state, getRootProps, getInputProps, removeAt, open } =
    useUploader({
      accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
      maxFiles: 1,
      multiple: true,
      createPreview: true,
      onError: (m) => alert(m),
    })

  const MAX = 5

  return (
    <DottedBox
      state={state}
      className="min-h-[132px] !p-0"
      {...getRootProps({ role: 'button', tabIndex: 0 })}
    >
      <input {...getInputProps()} />

      <div className="w-full p-6 sm:p-8">
        {files.length === 0 && (
          <div className="text-center select-none">
            <ImagePlusIcon className="mx-auto mb-2 h-8 w-8 text-gray-500 opacity-70" />
            <p className="text-sm font-medium text-gray-500">
              클릭하여 이미지 업로드
            </p>
            <p className="mt-1 text-xs text-gray-500">JPG, PNG (최대 5MB)</p>
          </div>
        )}

        {files.length > 0 && (
          <div
            className="mt-2"
            onClick={(e) => e.stopPropagation()} // 썸네일 클릭이 드롭존 열기로 버블링되는 것 방지
          >
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {files.map((f: Uploaded, i) => (
                <li key={`${f.name}-${i}`} className="relative">
                  <img
                    src={f.preview}
                    alt={f.name}
                    className="h-24 w-full rounded-lg object-cover"
                    onLoad={() => f.preview && URL.revokeObjectURL(f.preview)}
                    onClick={() => removeAt(i)}
                  />
                </li>
              ))}

              {files.length < MAX && (
                <li>
                  <button
                    type="button"
                    className="grid h-24 w-full place-items-center rounded-lg border border-dashed border-gray-300 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      open?.()
                    }}
                  >
                    <PlusIcon className="h-6 w-6 text-gray-500" />
                    <span className="mt-0 text-xs text-gray-500">
                      {files.length}/{MAX}
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </DottedBox>
  )
}
