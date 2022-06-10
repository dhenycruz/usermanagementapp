import {
  ButtonCancel,
  ButtonClose,
  ButtonConfirm,
  Input,
  Label,
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

const UpdateUser = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal open={ isOpen }>
      <ModalContainer>
        <ModalHeader>
          <h3>Editar Usuário</h3>
          <ButtonClose type="button" onClick={ () => setIsOpen(false) } className="buttonClose">x</ButtonClose>
        </ModalHeader>
        <ModalBody>
            <Label>
              <p>Nome:</p>
              <Input />
            </Label>
            <Label>
              Email:
              <Input />
            </Label>
            <Label>
              Password:
              <Input type="password" name="password"/>
            </Label>
        </ModalBody>
        <ModalFooter>
          <div>
          <ButtonCancel type="button" onClick={ () => setIsOpen(false) }>Cancelar</ButtonCancel>
          <ButtonConfirm>Salvar</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default UpdateUser;
