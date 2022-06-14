import { useState, useEffect } from 'react';
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
import { validateNumberName, validateCharacterName } from './validateInputs';

const AlertBox = styled.div`
  background-color: #f4020252;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 10px 0 10px 10px;

  /* .alert-items {
    align-items: center;
    
    
    display:flex;
    float: left;
    
    width: 100%;
  } */
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
  const [valueName, setName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState<string[]>([]);

  const cancelORClose = () => {
    setName('');
    setIsOpen(false);
    setError([]);
  }


  const validateName = (value: string) => {
    const validateN: string[] = validateNumberName(value, error);
    const validateC: string[] = validateCharacterName(value, validateN);
    setError(validateC);
  };


  const handleChange = ({ target: { name, value} }: Event ) => {
    if (name === 'name') {
      validateName(value);
      if (value.length >= 6) {
        setError((prev) => prev.filter((message) => message !== 'Nome tem que ter no mínimo 6 caracteres.'));
      }
      setName(value);
    }
  };

  const validateInput = ({ target: { name, value} }: Event) => {
    if (name === 'name') {
      if (value.length < 6) {
        const filterExistsError = error.some((message) => message === 'Nome tem que ter no mínimo 6 caracteres.');
        if (!filterExistsError) {
          setError((_prev) => ['Nome tem que ter no mínimo 6 caracteres.']);
        }
      } else {
        setError((prev) => prev.filter((message) => message !== 'Nome tem que ter no mínimo 6 caracteres.'));
      }
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
              <Input name="name" value={ valueName } type="text" onBlur={ validateInput } onChange={ handleChange } />
            </Label>
            <Label>
              Email:
              <Input />
            </Label>
            <Label>
              Password:
              <Input type="password" name="password"/>
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
          <ButtonConfirm type="button" disabled={ buttonDisabled }>Salvar</ButtonConfirm>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default CreateUser;
