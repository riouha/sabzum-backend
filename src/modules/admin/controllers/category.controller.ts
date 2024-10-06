import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AdminTokenGuard from '../guards/admin-token.guard';
import { CategoryService } from '../../category/category.service';
import { CategoryDto } from '../../category/dtos/category.dto';
import { GetToken } from '../../../common/decorators/get-token.decorator';
import { ITokenPayload } from '../../../common/types/token.interface';

@ApiBearerAuth('AdminBearerToken')
@UseGuards(AdminTokenGuard)
@ApiTags('admin')
@Controller('admin/category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/:id')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCategory(id);
  }

  @Post('/')
  async addCategory(@Body() dto: CategoryDto, @GetToken() token: ITokenPayload) {
    return this.service.addCategory(dto, token.sub);
  }

  @Patch('/:id')
  async editCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: CategoryDto) {
    return this.service.editCategory(id, dto);
  }
}
