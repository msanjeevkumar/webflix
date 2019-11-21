import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let exceptionObj = null;
    try {
      exceptionObj = JSON.parse(JSON.stringify(exception));
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error(e);
    }

    const { status, message } = exceptionObj;

    let responseJson = {};
    if (typeof message === 'string') {
      responseJson = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else {
      responseJson = {
        ...message,
      };
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseJson);
  }
}
