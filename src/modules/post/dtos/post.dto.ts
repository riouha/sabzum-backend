import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  published?: Date;

  @IsString()
  content: string;
  @IsString()
  htmlContent: string;

  @IsString()
  thumbnail: string;
  @IsOptional()
  @IsString()
  main?: string;

  @IsOptional()
  @IsString()
  thumbnailAlt?: string;
  @IsOptional()
  @IsString()
  seoTitle?: string;
  @IsOptional()
  @IsString()
  seoText?: string;

  @IsOptional()
  @IsString({ each: true })
  keywords?: string[];
}

export class EditPostDto extends PartialType(CreatePostDto) {}

export class SearchPostDto /* extends SearchDto */ {
  @IsOptional()
  @IsIn(['0', '1'])
  drafts?: '0' | '1';
}
