import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int8', nullable: true })
  size: number;

  @Column()
  type: string;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;
}
