import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
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
import { IUser} from '../../interfaces/interfaces';
import { deleteUser } from '../../services/api-backend';

type Props = {
  isOpen: boolean,
  setIsOpen: Function,
  user: IUser,
}

const DeleteUser = ({isOpen, setIsOpen, user }: Props) => {
  const { setLoading, setSkip } = useContext(UserContext);
  const submitDelete = async (id: number): Promise <void> => {
    try {
      deleteUser(id);
      setIsOpen(false);
      setLoading(true);
      setSkip(0);
    } catch (e) {
      console.log('houve algum erro!');
    }
  };

  return (
    <Modal open={ isOpen }>
      <ModalContainer>
        <ModalHeader>
          <h3>Deletando Usuário</h3>
          <ButtonClose type="button" onClick={ () => setIsOpen(false) } className="buttonClose">x</ButtonClose>
        </ModalHeader>
        <ModalBody>
            <p> Realmente deseja deletar <strong>{ user.name }</strong>?</p>
        </ModalBody>
        <ModalFooter>
          <div>
          <ButtonCancel type="button" onClick={ () => setIsOpen(false) }>NÃO</ButtonCancel>
          <ButtonConfirm onClick={ () => submitDelete(user.id_user) }>SIM</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default DeleteUser;
