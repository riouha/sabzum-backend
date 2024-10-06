import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { File } from '../../file/entities/file.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  published?: Date;

  @Column({ nullable: true })
  content?: string;
  @Column({ nullable: true })
  htmlContent?: string;

  @Column()
  thumbnail: string;
  @JoinColumn({ name: 'thumbnail' })
  @ManyToOne(() => File)
  thumbnailFile?: File;

  @Column({ nullable: true })
  main?: string;
  @JoinColumn({ name: 'main' })
  @ManyToOne(() => File)
  mainFile?: File;

  //#region seo
  @Column({ nullable: true })
  thumbnailAlt?: string;
  @Column({ nullable: true })
  seoTitle?: string;
  @Column({ nullable: true })
  seoText?: string;
  @Column({ type: 'simple-array', nullable: true })
  keywords?: string[];
  //#endregion

  @ManyToMany(() => Category)
  @JoinTable({ name: 'post_categories' })
  categories?: Category[];

  //########################################
  @Column()
  authorId: number;
  @ManyToOne(() => Admin)
  author?: Admin;

  // @Transform(({ value }) => Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(value))
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
