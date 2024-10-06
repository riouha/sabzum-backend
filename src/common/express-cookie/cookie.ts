import { CookieOptions } from 'express';

export class Cookie {
  constructor(
    public name: string,
    public data: any,
    public options?: CookieOptions,
  ) {}
}
