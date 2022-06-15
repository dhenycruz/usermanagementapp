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
import { createUser } from '../../services/api-backend';

const AlertBox = styled.div`
  background-color: #f4020252;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 10px 0 10px 10px;
`;

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Event {
  target: {
    name: string,
    value: string,
  }
}

const CreateUser = ({ isOpen, setIsOpen }: Props) => {
  const { getUsers, setLoading } = useContext(UserContext);
  const [valueName, setName] = useState('');
  const [valueEmail, setEmail] = useState('');
  const [valuePassword, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState<string[]>([]);
  const [onLoad, setOnLoad] = useState(false);

  const cancelORClose = () => {
    setName('');
    setEmail('');
    setPassword('');
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
    if (name === 'password') {
      const lastLetter = value.substr(-1);
      if (lastLetter === ' ') {
        if (error.length > 0) {
          if (!error.some((message) => message === 'A senha não pode conter espaços em branco.')) {
            error.push('A senha não pode conter espaços em branco.');
            setError(() => error);
            setOnLoad(!onLoad);
          }
        } else {
          setError(['A senha não pode conter espaços em branco.']);
        }
        value = value.slice(0, -1)
      } else {
        const removeError =  error.filter((message) => message !== 'A senha não pode conter espaços em branco.')
        setError((_prev) => removeError.filter((message) => message !== 'A senha não pode ser vazia!'));
      }
      if(value.length >=6) {
        setError((prev) => prev.filter((message) => message != 'A senha tem que ter no mínimo 6 caracteres.'));
      }
      setPassword(value);
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

  const validateFocusPassword = ({ target: { value } }: Event) => {
    if(value === '') {
      if (error.length > 0) {
        if (!error.some((message) => message === 'A senha não pode ser vazia!')) {
          error.push('A senha não pode ser vazia!');
          setError(() => error);
          setOnLoad(!onLoad);
        }
      } else {
        setError(['A senha não pode ser vazia!']);
      }

      return;
    }
    
    if (value.length < 6 ) {
      if (error.length > 0) {
        if (!error.some((message) => message === 'A senha tem que ter no mínimo 6 caracteres.')) {
          error.push('A senha tem que ter no mínimo 6 caracteres.');
          setError(() => error.filter((message) => message !== 'A senha não pode ser vazia!'));
          setOnLoad(!onLoad);
        }
      } else {
        setError(['A senha tem que ter no mínimo 6 caracteres.']);
      }
    }
  };

  useEffect(() => {
    const verifyName = () => {
      if (/[0-9]/.test(valueName)) return false;
      if (/\W|_/.test(valueName.replace(/ /g, ""))) return false;
      if (valueName.length < 5) return false;
      return true;
    };
    const verifyEmail = () => {
      if (!/\S+@\S+\.\S+/.test(valueEmail)) return false;
      return true; 
    };
    const verifyPassword = () => {
      if (valuePassword.length < 6) return false;
      return true;
    }

    if (verifyName() && verifyEmail() && verifyPassword()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [valueName, valueEmail, valuePassword]);

  const submitCreateUser = async () => {
    try {
      await createUser({ name: valueName, email: valueEmail, password: valuePassword });
      setIsOpen(false);
      setLoading(true);
      cancelORClose();
      getUsers(6,0);
    } catch (e) {
      console.log('Algo deu errado!');
    }
  }

  return (
    <Modal open={ isOpen }>
      <ModalContainer>
        <ModalHeader>
          <h3>Criar Usuário</h3>
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
            <Label>
              Password:
              <Input name="password" value={ valuePassword } type="password" onBlur={ validateFocusPassword }  onChange={ handleChange }/>
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
          <ButtonConfirm type="button" disabled={ buttonDisabled } onClick={ () => submitCreateUser() }>Salvar</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default CreateUser;
