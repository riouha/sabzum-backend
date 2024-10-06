// import { BadGatewayException, Injectable } from '@nestjs/common';
// import axios from 'axios';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class SmsService {
//   constructor(private readonly configService: ConfigService) {}

//   async sendOtp(receiver: string, code: string) {
//     const result = await axios.post('https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber', {
//       username: this.configService.get('WEBHUBS_SMS_USERNAME'),
//       password: this.configService.get('WEBHUBS_SMS_PASSWORD'),
//       bodyId: 212601,
//       text: code,
//       to: receiver,
//     });
//     if (result.data.RetStatus != 1) throw new BadGatewayException('sms provider error. please try later.');
//   }
// }
