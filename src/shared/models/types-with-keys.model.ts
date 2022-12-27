import { ErrorsCode } from "./Error-enum.interface";


export type TypeWithKey<T> = { [key in keyof typeof ErrorsCode]: T };