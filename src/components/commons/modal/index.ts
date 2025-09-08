import ModalRoot from './ModalRoot'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'

const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Footer: ModalFooter,
})

export default Modal
