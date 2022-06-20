import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styled from 'styled-components';
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
import { validateNumberName, validateCharacterName, validateEmail } from './validateInputs';
import { updateUser } from '../../services/api-backend';
import { IUser } from '../../interfaces/interfaces';

const AlertBox = styled.div`
  background-color: #f4020252;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 10px 0 10px 10px;
`;

type Props = {
  isOpen: boolean,
  setIsOpen: Function,
  user: IUser,
  setSelectUser: Function,
}

interface Event {
  target: {
    name: string,
    value: string,
  }
}

const UpdateUser = ({ isOpen, setIsOpen, user, setSelectUser }: Props) => {
  const { getUsers, setLoading, openAlert } = useContext(UserContext);
  const [valueName, setName] = useState(user.name);
  const [valueEmail, setEmail] = useState(user.email);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState<string[]>([]);
  const [onLoad, setOnLoad] = useState(false);

  const cancelORClose = () => {
    setSelectUser({});
    setIsOpen(false);
    setError([]);
  }


  const validateName = (value: string) => {
    if (value !== '') {
      const validateN: string[] = validateNumberName(value, error);
      const validateC: string[] = validateCharacterName(value, validateN);
      setError(validateC.filter((message) => message !== 'Nome não pode ser vazio!'));
      setOnLoad(!onLoad);
    } else {
      const validateN: string[] = validateNumberName(value, error);
      const validateC: string[] = validateCharacterName(value, validateN);
      setError(validateC);
      setOnLoad(!onLoad);
    }
  };


  const handleChange = ({ target: { name, value} }: Event ) => {
    if (name === 'name') {
      validateName(value);
      if (value.length >= 5) {
        setError((prev) => prev.filter((message) => message !== 'Nome tem que ter no mínimo 5 caracteres.'));
      }
      setName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
  };

  const validateFocusName = ({ target: { value} }: Event) => {
    if(value === '') {
      if (error.length > 0) {
        if (!error.some((message) => message === 'Nome não pode ser vazio!')) {
          error.push('Nome não pode ser vazio!');
          setError(() => error);
          setOnLoad(!onLoad);
        }
      } else {
        setError(['Nome não pode ser vazio!']);
      }

      return;
    }

    if (value.length < 5) {
      if (error.length > 0) {
        if (!error.some((message) => message === 'Nome tem que ter no mínimo 5 caracteres.')) {
          error.push('Nome tem que ter no mínimo 5 caracteres.');
          setError(() => error);
          // setError nao tava renderizando de novo, então criei um state só para redenrizar os erros novamente.
          setOnLoad(!onLoad);
        }
      } else {
        setError(['Nome tem que ter no mínimo 5 caracteres.']);
      }
    } else {
      setError((prev) => prev.filter((message) => message !== 'Nome tem que ter no mínimo 5 caracteres.'));
    }
  }

  const validateFocusEmail = ({ target: { value } }: Event) => {
    if(value === '') {
      if (error.length > 0) {
        if (!error.some((message) => message === 'Email não pode ser vazio!')) {
          error.push('Email não pode ser vazio!');
          setError(() => error);
          setOnLoad(!onLoad);
        }
      } else {
        setError(['Email não pode ser vazio!']);
      }
    } else {
      const validate = validateEmail(value, error);
      setError(validate.filter((message) => message !== 'Email não pode ser vazio!'));
      setOnLoad(!onLoad);
    }
  };

  useEffect(() => {
    const verifyName = () => {
      if (/d/.test(valueName)) return false;
      if (/\W|_/.test(valueName.replace(/ /g, ""))) return false;
      if (valueName.length < 5) return false;
      return true;
    };
    const verifyEmail = () => {
      if (!/\S+@\S+\.\S+/.test(valueEmail)) return false;
      return true; 
    };

    if ((verifyName() && verifyEmail()) && (valueName !== user.name || valueEmail !== user.email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [valueName, valueEmail]);

  const submitUpdateUser = async () => {
    try {
      await updateUser({ name: valueName, email: valueEmail }, user.id_user);
      setIsOpen(false);
      setLoading(true);
      cancelORClose();
      getUsers(6,0);
      openAlert('Usuário atualizado com sucesso!');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal open={ isOpen }>
      <ModalContainer>
        <ModalHeader>
          <h3>Editar Usuário</h3>
          <ButtonClose type="button" onClick={ () =>  cancelORClose() } className="buttonClose">x</ButtonClose>
        </ModalHeader>
        <ModalBody>
            <Label>
              <p>Nome:</p>
              <Input name="name" value={ valueName } type="text" onBlur={ validateFocusName } onChange={ handleChange } />
            </Label>
            <Label>
              Email:
              <Input name="email" value={ valueEmail } type="email" onBlur={ validateFocusEmail }  onChange={ handleChange } />
            </Label>
            { error.length > 0 &&
              <AlertBox>
                { error.map((erro, index) => (
                  <div key={ index} className="alert-items">
                    * { erro }
                  </div>
                )) }
              </AlertBox>
            }
        </ModalBody>
        <ModalFooter>
          <div>
          <ButtonCancel type="button" onClick={ () => cancelORClose() }>Cancelar</ButtonCancel>
          <ButtonConfirm type="button" disabled={ buttonDisabled } onClick={ () => submitUpdateUser() }>Salvar</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default UpdateUser;
