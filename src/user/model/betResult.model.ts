import { ApiProperty } from '@nestjs/swagger';

export class BetResultModel {
  @ApiProperty()
  result: number;
  balance: number;
}
