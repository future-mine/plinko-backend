import { IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BetDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  betSize: number;
}
