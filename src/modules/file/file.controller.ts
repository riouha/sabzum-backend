import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './services/file.service';
import { join } from 'path';
import { createReadStream } from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:id')
  async downloadFile(@Param('id') id: string): Promise<StreamableFile> {
    await this.fileService.getFile(id);
    const stream = createReadStream(join(process.cwd(), 'uploads', id));
    return new StreamableFile(stream, { type: 'image', disposition: 'inline' });
  }
}
