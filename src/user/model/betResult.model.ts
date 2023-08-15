import { ApiProperty } from '@nestjs/swagger';

export class BetResultModel {
  @ApiProperty()
  result: number;
  @ApiProperty()
  profit: number;
  @ApiProperty()
  resultIndex: number;
  @ApiProperty()
  balance: number;
}
