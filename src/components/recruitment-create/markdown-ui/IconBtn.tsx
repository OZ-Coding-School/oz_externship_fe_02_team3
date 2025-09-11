import type { ReactNode, MouseEventHandler } from 'react'

export default function IconBtn({
  children,
  onClick,
  title,
}: {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  title?: string
}) {
  return (
    <button
      type="button"
      title={title} // (작성 / 미리보기) & 아이콘 버튼
      onClick={onClick}
      className="hover: inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  )
}
