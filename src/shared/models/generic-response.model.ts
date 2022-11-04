export class GenericResponse<T>{

    code:number;

    error:ErrorObject | string;

    validationResult:boolean;

    data: T;


}

export class ErrorObject {
    statusCode:number;
    message:string[] ;
    error:string;
}

export function getErrorMessage(code:number,message:string[]): ErrorObject{
    return {
        statusCode:code,
        message:message,
        error:''
    }
   }

export function getGenericMessage<T>(code:number, validation:boolean, data:T,message:string[]){

    const response = new GenericResponse<T>();

    response.code = code;
    response.data = data;
    response.validationResult=validation;
    response.error = code== 502 ? getErrorMessage(code,message) : '';

    return response;
    

}