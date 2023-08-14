import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Entity,
  Column,
  AfterLoad,
  BeforeUpdate,
  BeforeInsert,
  AfterUpdate,
  AfterInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { security } from 'src/config';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, unique: true })
  public username: string;

  @ApiPropertyOptional()
  @Column({ type: 'text', nullable: true })
  public description: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  public password: string;

  @ApiProperty()
  @Column({ type: 'float8', nullable: false, default: 0 })
  public balance: number;

  @AfterInsert()
  handleAfterInsert() {
    this.password = undefined;
  }
  @AfterUpdate()
  handleAfterSave() {
    this.password = undefined;
  }
  @BeforeInsert()
  async setPassword(password: string) {
    const pass = password || this.password;
    if (pass) {
      this.password = await bcrypt.hash(pass, security.salt);
    }
  }

  async validatePassword(password: string) {
    console.log(password, this.password);
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(password, this.password);
  }
}
