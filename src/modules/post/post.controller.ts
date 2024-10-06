import { ClassSerializerInterceptor, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Param, UseInterceptors } from '@nestjs/common/decorators';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  @Get('/')
  async searchPosts() {
    return this.postService.sarchPosts();
  }
}
