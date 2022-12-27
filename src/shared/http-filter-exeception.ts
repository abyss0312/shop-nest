import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { getValidationError } from './ge-validation-error';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    let messageErr ='';

    switch(error['statusCode']){

      case 400 :
       messageErr = getValidationError('ERR_400')
      break;

      case 500:
        messageErr = getValidationError('ERR_NETWORK')
    }


    response
      .status(status)
      .json({
        code: status,
        validatonResult:false,
        data: null,
        error:messageErr
      });
  }


}