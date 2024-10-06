import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '../types/token.interface';

export const GetToken = createParamDecorator((_data, ctx: ExecutionContext): ITokenPayload => {
  return ctx.switchToHttp().getRequest().user;
});
