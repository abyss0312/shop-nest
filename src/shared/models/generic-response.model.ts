export class GenericResponse<T>{
    code:number;
    validateResult: boolean;
    message:string;
    data: T
}