import { Cookie } from './cookie';

export class ResponseWithCookie {
  constructor(
    public data: any,
    public cookie: Cookie,
  ) {}
}
