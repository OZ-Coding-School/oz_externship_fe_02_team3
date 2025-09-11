import { FileText as FileTextIcon, X as XIcon } from 'lucide-react'

interface Props {
  files: (File & { preview?: string })[]
  onRemove?: (i: number) => void
  showSize?: boolean
  showPreview?: boolean
  thumbSize?: number
  dense?: boolean
  className?: string
}

export default function FileList({
  files,
  onRemove,
  showSize = true,
  showPreview = false,
  thumbSize = 32,
  dense = false,
  className,
}: Props) {
  if (!files.length) return null

  const fmt = (n: number) => (n / 1024 / 1024).toFixed(2) + 'MB'

  return (
    <div
      className={`space-y-2 ${className ?? ''}`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <p className="text-sm text-gray-600">업로드된 파일:</p>

      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {files.map((f, i) => {
          const isImg = f.type?.startsWith('image/')
          return (
            <li
              key={`${f.name}-${i}`}
              className={`flex items-center justify-between px-3 ${dense ? 'py-1.5' : 'py-2'}`}
            >
              <div className="flex items-center gap-3">
                {showPreview && isImg && f.preview ? (
                  <img
                    src={f.preview}
                    alt={f.name}
                    className="shrink-0 rounded object-cover"
                    style={{
                      width: thumbSize,
                      height: thumbSize,
                      minWidth: thumbSize,
                      minHeight: thumbSize,
                    }}
                    onLoad={() => URL.revokeObjectURL(f.preview!)}
                  />
                ) : (
                  <FileTextIcon
                    className="shrink-0 text-gray-500"
                    style={{
                      width: Math.max(thumbSize - 8, 16),
                      height: Math.max(thumbSize - 8, 16),
                    }}
                    aria-hidden
                  />
                )}

                <span className="max-w-[520px] truncate text-sm font-medium text-gray-800">
                  {f.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                {showSize && <span className="text-xs">{fmt(f.size)}</span>}
                {!!onRemove && (
                  <button
                    type="button"
                    className="rounded-md p-1 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(i)
                    }}
                    aria-label={`${f.name} 제거`}
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
