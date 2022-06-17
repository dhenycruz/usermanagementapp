import styled from 'styled-components';

export const Modal = styled.div<{ open: boolean }>`
    animation: fadeIn 0.1s;
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(2px);

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0;}
    }

    ${({ open }) => open ? `display: flex `: `animation: fadeOut 1s` }
`;

export const ModalContainer = styled.section`
  background-color: white;
  border-radius: 13px;
  box-shadow: 0 0 1em black;
  display: flex;
  flex-direction: column;
  width: 375px;
`;

export const ModalHeader = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ModalFooter = styled.div`
  align-items: center;
  border-top: 2px solid rgba(0, 0, 0, .1);
  display: flex;
  height: 35px;
  justify-content: end;
  padding: 10px;
`;

export const ButtonClose = styled.button`
  border: none;
  background: none;
  font-size:20px;
  font-weight: 700;
  color: grey;
  margin-right: 10px;
  cursor: pointer;


  &:hover {
    color: rgba(69, 0, 147, .8); ;
  }
`;

export const ButtonConfirm = styled.button`
  background-color: rgb(69 0 147);
  border: 1px solid rgb(69 0 147);;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px;
  padding: 5px 15px;

  &:hover {
    background-color: rgba(69, 0, 147, .8); 
  }

  &:disabled {
    background-color: #5b485c;
    border: 1px solid grey;
  }

`;

export const ButtonCancel = styled.button`
  border: 1px solid #6600cc;
  color: #6600cc;
  border-radius: 4px;
  font-weight: 700;
  padding: 5px 15px;
  background-color:  #f2e6ff;

  &:hover {
    background-color:#ffffff;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #bf80ff; 
  border-radius: 3px;
  color: #6600cc;

  &:hover {
    border: 1px solid #6600cc;
  }

  &:focus {
    outline: 1px solid #6600cc;
  }
`;
