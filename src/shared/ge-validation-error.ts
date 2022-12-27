import { TypeWithKey } from './models';

export const getValidationError = (errorCode: any) => {
  console.log(errorCode)
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: 'Se rompió la red',
    ERR_TIMEOUT: 'Se acabó el tiempo',
    ERR_CANCEL: 'Se canceló la petición',
    ERR_UNKNOWN: 'Error desconocido',
    ERR_400: 'Error sobre la informacion suministrada',
    ERR_401: 'Error 401',
    ERR_404: 'No Encontrado',
    ERR_USER_NOT_FOUND: 'Usuario no encontrado',
    ERR_PASS_INCORRECT:'password incorrecto',
    ER_DUP_ENTRY:'Ya existe '
  };
  return codeMatcher[errorCode];
};


