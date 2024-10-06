// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import Redis from 'ioredis';

// @Injectable()
// export class RedisService extends Redis implements OnModuleDestroy {
//   constructor(configService: ConfigService) {
//     super(Number(configService.get('REDIS_PORT')), configService.get<string>('REDIS_HOST') ?? '');
//     this.on('error', (err) => {
//       console.log('Redis connection failed', err);
//       process.exit(1);
//     });

//     // setTimeout(async () => {
//     //   // {
//     //   //   'cart:1' : {
//     //   //       'prd-21' : 2  ==========> use hincrby + another key cart:1-total : total price with 1 day ttl
//     //   //       'prd-22' : {quantity:2, price:10000} ==========> set ttl in every change have price, total price
//     //   //     }, ...
//     //   // }

//     //   // this.incrby()

//     //   // await this.hset('cart:2', 'prd-23', 3);
//     //   await this.pexpire('cart:2', 10); // from last cange
//     //   await this.hset('cart:1', 'prd-23', 3);
//     //   await this.hset('cart:1', 'prd-23', 4);
//     //   await this.hincrby('cart:1', 'prd-23', 3);
//     //   await this.hset('cart:1', 'prd-24', 0);
//     //   await this.hdel('cart:1', 'PX');
//     //   const x = await this.hgetall('cart:1');
//     //   console.log(x, await this.hget('cart:1', 'prd-21')); //
//     //   // console.log(await this.keys('*'));
//     //   // await this.del('cart:2');
//     //   console.log(await this.keys('*'));
//     // }, 5000);
//   }

//   onModuleDestroy() {
//     this.quit();
//   }
// }
