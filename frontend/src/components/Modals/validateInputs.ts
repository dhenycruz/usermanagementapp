interface ReturnVlidateName {
  error: string,
}
export const validateName = (name: string): ReturnVlidateName | true => {
  // Validate if there is a number in the name
  // reference : https://backefront.com.br/como-saber-se-a-string-contem-numero/
  const verifyNumber = /[0-9]/;
  if (verifyNumber.test(name)) return { error: 'Nome não pode haver números.' }

  // Validate if there is a special character in the name
  // reference: https://pt.stackoverflow.com/questions/342605/verificar-a-exist%C3%AAncia-de-caracteres-especiais-em-uma-string-utilizando-regexp
  const verifyCharacter = /\W|_/;
  if (verifyCharacter.test(name.replace(/ /g, ""))) return { error: 'Nome não pode haver caracteres. especiais' }

  if (name.length < 6) return { error: 'Nome tem que ter no mínimo 6 caracteres.'}
  
  return true;
};