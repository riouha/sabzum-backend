import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Between, FindManyOptions, FindOptionsWhere, LessThan, MoreThan } from 'typeorm';
import { setProperty } from '../utils/helpers';

export class SearchDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dateFrom?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dateTo?: Date;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  sortBy?: string;

  static BuildRangeFilter(from?: any, to?: any) {
    if (from && to) return Between(from, to);
    if (from) return MoreThan(from);
    if (to) return LessThan(to);
  }

  static BuildSearchOptions<T>(dto: SearchDto, dateField: keyof T = 'createDate' as keyof T) {
    const whereOptions: FindOptionsWhere<T> = {};
    if (dto?.dateFrom && dto?.dateTo) setProperty(whereOptions, dateField, Between(dto.dateFrom, dto.dateTo) as any);
    else if (dto?.dateFrom) setProperty(whereOptions, dateField, MoreThan(dto.dateFrom) as any);
    else if (dto?.dateTo) setProperty(whereOptions, dateField, LessThan(dto.dateFrom) as any);

    return {
      where: whereOptions,
      order: { [dto?.sortBy ?? dateField]: dto?.sortOrder ?? 'DESC' },
      skip: dto?.skip ?? 0,
      take: dto?.limit ?? 15,
    } as ISearchOptions<T>;
  }
}

interface ISearchOptions<T> extends FindManyOptions<T> {
  where: FindOptionsWhere<T>;
}
