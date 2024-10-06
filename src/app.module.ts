import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get<number>('PG_PORT'),
          username: configService.get('PG_USER'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DBNAME'),
          logging: ['error', 'info'],
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as PostgresConnectionOptions),
      inject: [ConfigService],
    }),
    AdminModule,
    UserModule,
    PostModule,
    CategoryModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
