import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isEnum } from 'class-validator';

export class FieldValidatorPipe implements PipeTransform {
  constructor(private validators: { func: any; args: any[] }[]) {
    this.validators = [{ func: isEnum, args: [] }];
  }

  transform(value: any) {
    for (let i = 0; i < this.validators.length; i++) {
      const valid = this.validators[i].func(value, ...this.validators[i].args);
      if (!valid) throw new BadRequestException('Invalid Filed');
    }
    return value;
  }
}
