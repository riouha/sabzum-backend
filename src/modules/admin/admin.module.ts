import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import AdminTokenGuard from './guards/admin-token.guard';
import { AdminTokenStrategy } from './guards/admin-token.strategy';
import { CategoryController } from './controllers/category.controller';
import { CategoryModule } from '../category/category.module';
import { PostModule } from '../post/post.module';
import { PostController } from './controllers/post.controller';
import { FileModule } from '../file/file.module';
import { FileController } from './controllers/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({}),
    MulterModule.register({
      dest: join(__dirname, '../../../uploads'),
    }),
    ConfigModule,
    CategoryModule,
    FileModule,
    PostModule,
  ],
  controllers: [AdminController, CategoryController, PostController, FileController],
  providers: [AdminService, AdminTokenStrategy, AdminTokenGuard],
  exports: [],
})
export class AdminModule {}
