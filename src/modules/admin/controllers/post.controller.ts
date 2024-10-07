import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AdminTokenGuard from '../guards/admin-token.guard';
import { GetToken } from '../../../common/decorators/get-token.decorator';
import { ITokenPayload } from '../../../common/types/token.interface';
import { CreatePostDto, EditPostDto } from '../../post/dtos/post.dto';
import { PostService } from '../../post/post.service';

@ApiBearerAuth('AdminBearerToken')
@UseGuards(AdminTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('admin')
@Controller('admin/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(@Body() dto: CreatePostDto, @GetToken() token: ITokenPayload) {
    return this.postService.createPost(dto, token.sub);
  }

  @Patch('/:id')
  async editPost(@Param('id', ParseIntPipe) id: number, @Body() dto: EditPostDto, @GetToken() token: ITokenPayload) {
    return this.postService.editPost(id, dto, token.sub);
  }

  @Get('/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }
}
