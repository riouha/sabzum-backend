import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class AdminTokenGuard extends AuthGuard('admin-token-strategy') {
  // constructor(private reflector: Reflector) {
  //   super();
  // }
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
  //   if (isPublic) return true;
  //   return super.canActivate(context);
  // }
}
