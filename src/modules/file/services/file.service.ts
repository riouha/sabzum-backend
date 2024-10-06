import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  async saveImage(file: Express.Multer.File) {
    return this.fileRepo.save(
      this.fileRepo.create({
        id: file.filename,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
      }),
    );
  }

  async getGallery() {
    const images = await this.fileRepo.find({ where: { type: ILike('image%') } });
    return images.map((img) => ({
      id: img.id,
      src: `http://${this.configService.get('APP_URL')}:${this.configService.get('PORT')}/file/${img.id}`,
      name: img.name,
    }));
  }

  async getFile(id: string) {
    const file = await this.fileRepo.findOne({ where: { id } });
    if (!file) throw new NotFoundException('file not found');
    return file;
  }
}
