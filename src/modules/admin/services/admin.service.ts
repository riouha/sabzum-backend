import { Injectable, UnauthorizedException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto, LoginAdminDto } from '../dtos/admin.dto';
import { hash, verify } from 'argon2';
import { IAdminTokenPayload } from '../types/admin.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { mobile: dto.username } });
    if (!admin) throw new UnauthorizedException();
    if (!admin.isActive) throw new ForbiddenException();

    const isValid = await verify(admin.password, dto.password);
    if (!isValid) throw new UnauthorizedException();

    return { access_token: await this.getAccessToken({ sub: admin.id }), admin };
  }

  async createAdmin(dto: CreateAdminDto) {
    const isDuplicate = await this.adminRepo.findOne({ where: { mobile: dto.mobile } });
    if (isDuplicate) throw new ConflictException('duplicate mobile');

    return this.adminRepo.save(
      this.adminRepo.create({
        ...dto,
        password: await hash(dto.password),
      }),
    );
  }

  async listAdmins() {
    return this.adminRepo.find({ order: { createDate: 'DESC' } });
  }

  private async getAccessToken(payload: IAdminTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ADMIN_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ADMIN_TOKEN_EXPIRATION'),
    });
  }
}
