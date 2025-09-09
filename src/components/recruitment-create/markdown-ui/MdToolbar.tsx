import IconBtn from './IconBtn'
import { Bold, Italic, Code2, Link as LinkIcon, List } from 'lucide-react'

export default function MdToolbar({
  tab,
  setTab,
  onBold,
  onItalic,
  onCode,
  onLink,
  onH1,
  onBullet,
  onNumber,
}: {
  tab: 'edit' | 'preview'
  setTab: (t: 'edit' | 'preview') => void
  onBold: () => void
  onItalic: () => void
  onCode: () => void
  onLink: () => void
  onH1: () => void
  onBullet: () => void
  onNumber: () => void
}) {
  return (
    <div
      className={[
        'flex items-center bg-gray-50 px-2 py-2',
        'border-b border-gray-200',
      ].join(' ')}
    >
      {/* 좌측 탭 */}
      <div className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setTab('edit')}
          className={`rounded-md px-3 py-1 text-sm hover:cursor-pointer ${tab === 'edit' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          작성
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`rounded-md px-3 py-1 text-sm ${tab === 'preview' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:cursor-pointer hover:bg-gray-50'}`}
        >
          미리보기
        </button>
      </div>

      {/* 우측 툴바 */}
      <div className="ml-auto flex items-center gap-1">
        <IconBtn onClick={onBold}>
          <Bold className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={onItalic}>
          <Italic className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={onCode}>
          <Code2 className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={onLink}>
          <LinkIcon className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={onH1}>
          <span className="text-[11px] font-semibold">
            H<span className="text-[8px]">1</span>
          </span>
        </IconBtn>
        <IconBtn onClick={(e) => (e.shiftKey ? onNumber() : onBullet())}>
          <List className="h-4 w-4" />
        </IconBtn>
      </div>
    </div>
  )
}
