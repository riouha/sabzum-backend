import { BadRequestException, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileService } from '../../file/services/file.service';
import AdminTokenGuard from '../guards/admin-token.guard';
import { UploadSwaggerDecorators } from '../../../common/decorators/upload-swagger.decorators';

@ApiBearerAuth('AdminBearerToken')
@ApiTags('admin')
@Controller('admin/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AdminTokenGuard)
  @UploadSwaggerDecorators()
  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('no file uploaded');
    return this.fileService.saveImage(file);
  }

  @UseGuards(AdminTokenGuard)
  @Get('/gallery')
  async getGallery() {
    const result = await this.fileService.getGallery();
    return { result };
  }
  @Get('/gallery2')
  async getGallery2() {
    const result = await this.fileService.getGallery();
    return { result };
  }
}
