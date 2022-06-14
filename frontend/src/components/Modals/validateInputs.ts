interface ReturnValidateName {
  error: string,
}

export const validateNumberName = (name:string, messagesArray: string[]): string[] => {
  // Validate if there is a number in the name
  // reference : https://backefront.com.br/como-saber-se-a-string-contem-numero/
  const verifyNumber = /[0-9]/;
  if (verifyNumber.test(name)) {
    const filterExistsError = messagesArray.some((message) => message === 'Nome não pode haver números.');
    if (!filterExistsError) {
      messagesArray.push('Nome não pode haver números.');
    }
  } else {
    const filterExistsError = messagesArray.some((message) => message === 'Nome não pode haver números.');
    if (filterExistsError) {
      return messagesArray.filter((message) => message !== 'Nome não pode haver números.')
    }
  }
  return messagesArray;
};

export const validateCharacterName = (name: string, messagesArray: string[]): string[] => {
  // Validate if there is a special character in the name
  // reference: https://pt.stackoverflow.com/questions/342605/verificar-a-exist%C3%AAncia-de-caracteres-especiais-em-uma-string-utilizando-regexp
  const verifyCharacter = /\W|_/;
  if (verifyCharacter.test(name.replace(/ /g, ""))) {
    const filterExistsError = messagesArray.some((message) => message === 'Nome não pode haver caracteres especiais.');
    if (!filterExistsError) {
      messagesArray.push('Nome não pode haver caracteres especiais.');
    }
  } else {
    const filterExistsError = messagesArray.some((message) => message === 'Nome não pode haver caracteres especiais.');
    if (filterExistsError) {
      return messagesArray.filter((message) => message !== 'Nome não pode haver caracteres especiais.')
    }
  }
  return messagesArray;
};
