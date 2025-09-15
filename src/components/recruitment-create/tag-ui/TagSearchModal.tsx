import Button from '@src/components/commons/button/Button'
import Modal from '@src/components/commons/modal'

interface TagSearchModalProps {
  open: boolean
  onClose: () => void
  title?: string
}

export default function TagSearchModal({ open, onClose }: TagSearchModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="md" closeOnOutsideClick={false}>
      <Modal.Header onClose={onClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          태그선택
        </h2>
      </Modal.Header>
      <Modal.Footer>
        <div className="text-sm text-gray-500">태그 n개 선택됨</div>
        <div className="flex items-center gap-2">
          <Button buttonInnerText="취소" variant="outline" onClick={onClose} />
          <Button
            buttonInnerText="선택완료"
            variant="primary"
            size="base"
            fontWeight="medium"
            iconClassName="rotate-[90deg]"
            onClick={onClose}
            iconSize="sm"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
