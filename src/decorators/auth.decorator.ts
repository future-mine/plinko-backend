import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
