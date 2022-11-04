import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    response
      .status(status)
      .json({
        code: status,
        validatonResult:false,
        data: null,
        error:error
      });
  }
}