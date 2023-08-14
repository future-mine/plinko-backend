import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TokenModel } from './model/token.model';
import { CleanDtoPipe } from 'src/pipes/clean-dto.pipe';
import { LoginUserDto } from './dto/loginUser.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/getUser.decorator';
import { BetDto } from './dto/bet.dto';
import { BetResultModel } from './model/betResult.model';
import { DepositDto } from './dto/deposit.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body(CleanDtoPipe) user: LoginUserDto): Promise<TokenModel> {
    return this.userService.logIn(user);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserEntity,
    description: 'Register username and email',
  })
  @Post('register')
  async register(
    @Body(CleanDtoPipe) dto: RegisterUserDto,
  ): Promise<UserEntity> {
    return this.userService.register(dto);
  }

  @Auth()
  @Get('me')
  async getById(@GetUser('id') userId: number): Promise<UserEntity> {
    return this.userService.getById(userId);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('bet')
  async bet(
    @Body(CleanDtoPipe) dto: BetDto,
    @GetUser('id') userId: number,
  ): Promise<BetResultModel> {
    return this.userService.executeBet(dto, userId);
  }
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('deposit')
  async deposit(
    @Body(CleanDtoPipe) dto: DepositDto,
    @GetUser('id') userId: number,
  ): Promise<UserEntity> {
    return this.userService.deposit(dto, userId);
  }
}
