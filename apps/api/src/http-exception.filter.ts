import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let exceptionObj = null;
    console.log(exception);
    try {
      exceptionObj = JSON.parse(JSON.stringify(exception));
    } catch (e) {}

    const { status, message } = exceptionObj;

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message ? message : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
