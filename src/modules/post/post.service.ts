import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/post.dto';
import { slugify } from '../../common/utils/slugify';
import { FileService } from '../file/services/file.service';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>, private readonly fileService: FileService) {}

  async sarchPosts() {
    const posts = await this.postRepo.find({
      where: { published: Not(IsNull()) },
      relations: { author: true },
      order: { published: 'DESC' },
    });
    return posts;
  }

  async createPost(dto: CreatePostDto, adminId: number) {
    await this.fileService.getFile(dto.thumbnail);
    if (dto.main) await this.fileService.getFile(dto.main);

    const slug = slugify(dto.title);
    const duplicate = await this.postRepo.findOne({ where: { slug }, select: { id: true, slug: true, title: true } });
    if (duplicate) throw new ConflictException('duplicate slug', JSON.stringify(duplicate));

    const post = this.postRepo.create({ ...dto, slug, authorId: adminId });
    return this.postRepo.save(post);
  }

  async getPostBySlug(slug: string) {
    const post = this.postRepo.findOne({ where: { slug } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }
  async getPost(id: number) {
    const post = this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }
}
