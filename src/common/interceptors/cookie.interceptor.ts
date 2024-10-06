import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { Reflector } from '@nestjs/core';
import { ResponseWithCookie } from '../express-cookie/response-with-cookie';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((response) => {
        if (!(response instanceof ResponseWithCookie)) return response;
        // throw new InternalServerErrorException('CookieInterceptor used but ...');
        res.cookie(response.cookie.name, response.cookie.data, response.cookie.options!);
        return response.data;
      }),
    );
  }
}
