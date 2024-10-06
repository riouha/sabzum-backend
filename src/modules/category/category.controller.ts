import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/:slug')
  async getCategory(@Param('slug') slug: string) {
    return this.service.getCategoryBySlug(slug);
  }

  @Get('/')
  async getAllCategories() {
    return this.service.getAllcategories();
  }
}
