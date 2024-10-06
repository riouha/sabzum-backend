import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { slugify } from '../../common/utils/slugify';
import { CategoryDto } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async addCategory(dto: CategoryDto, adminId: number) {
    const duplicate = await this.repo.findOne({ where: { name: dto.name }, select: { id: true } });
    if (duplicate) throw new ConflictException('duplicate name');
    const post = this.repo.create({ ...dto, slug: slugify(dto.name), adminId });
    return this.repo.save(post);
  }

  async editCategory(id: number, dto: CategoryDto) {
    const result = await this.repo.update({ id }, { name: dto.name, slug: slugify(dto.name) });
    if (!result.affected) throw new NotFoundException('category not found');
    return this.repo.findOne({ where: { id } });
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.repo.findOne({ where: { slug } });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  async getCategory(id: number) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  async getAllcategories() {
    return this.repo.find();
  }
}
