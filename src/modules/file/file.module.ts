import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
