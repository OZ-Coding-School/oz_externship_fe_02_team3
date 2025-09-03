interface ModalFooterProps {
  left?: React.ReactNode // 안내문, 보조 텍스트 들어갈 공간
  right?: React.ReactNode // 버튼 들어갈 공간
}

export default function ModalFooter({ left, right }: ModalFooterProps) {
  return (
    <footer className="mt-4 flex items-center justify-between gap-4 border-t border-gray-300 px-6 py-4">
      <div className="text-sm text-gray-500">{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </footer>
  )
}
