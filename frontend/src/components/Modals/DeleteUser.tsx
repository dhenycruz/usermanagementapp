import {
  ButtonCancel,
  ButtonClose,
  ButtonConfirm,
  Modal,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './Modal';

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
}

const DeleteUser = ({isOpen, setIsOpen, }: Props) => {
  return (
    <Modal open={ isOpen }>
      <ModalContainer>
        <ModalHeader>
          <h3>Deletando Usuário</h3>
          <ButtonClose type="button" onClick={ () => setIsOpen(false) } className="buttonClose">x</ButtonClose>
        </ModalHeader>
        <ModalBody>
            <p> Realmente deseja deletar esse usuário?</p>
        </ModalBody>
        <ModalFooter>
          <div>
          <ButtonCancel type="button" onClick={ () => setIsOpen(false) }>NÃO</ButtonCancel>
          <ButtonConfirm>SIM</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default DeleteUser;
