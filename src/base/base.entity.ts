import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity as OrmBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity extends OrmBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @ApiProperty()
  @VersionColumn()
  public version: number;
}
