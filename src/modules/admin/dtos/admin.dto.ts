import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @IsPhoneNumber('IR')
  username: string;

  @IsString()
  password: string;
}

export class CreateAdminDto {
  @IsPhoneNumber('IR')
  mobile: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
