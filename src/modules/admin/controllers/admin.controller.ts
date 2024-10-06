import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import AdminTokenGuard from '../guards/admin-token.guard';
import { CreateAdminDto, LoginAdminDto } from '../dtos/admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/auth/login')
  async login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }

  @ApiBearerAuth('AdminBearerToken')
  @UseGuards(AdminTokenGuard)
  @Post('/create')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @ApiBearerAuth('AdminBearerToken')
  @UseGuards(AdminTokenGuard)
  @Get('/list')
  async listAdmins() {
    return this.adminService.listAdmins();
  }
}
