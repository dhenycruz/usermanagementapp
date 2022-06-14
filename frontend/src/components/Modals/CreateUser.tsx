import { useState } from 'react';
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
import { validateName } from './validateInputs';

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

interface Error {
  error: boolean,
  messages: string[],
}

const CreateUser = ({ isOpen, setIsOpen }: Props) => {
  const [valueName, setName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState<Error>({ error: false, messages: [] });

  const cancelORClose = () => {
    setName('');
    setIsOpen(false);
    setError({ error: false, messages: []});
  }

  const handleChange = ({ target: { name, value} }: Event ) => {
    if (name === 'name') {
      console.log(value);
      setName(value);
    }
  };

  const validateInput = ({ target: { name, value} }: Event) => {
    if (name === 'name') {
      const validate = validateName(value);
      if (validate !== true) {
        const newArrayError: string[] = error.messages;
        const filterExistsError = newArrayError.some((erro) => erro === validate.error);
        if (!filterExistsError) {
          newArrayError.push(validate.error);
          console.log(newArrayError);
          setError({ error: true, messages: newArrayError});
        }
      } else {
        console.log('validate true')
        setError({ error: false, messages: []});
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
            { error.error && (
              <AlertBox>
                { error.messages.map((erro, index) => (
                  <div key={ index} className="alert-items">
                    * { erro }
                  </div>
                )) }
              </AlertBox>
            )}
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
