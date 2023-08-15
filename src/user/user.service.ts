import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstantMessages } from 'src/utils/messages/constantsMessages';
import { LoginUserDto } from './dto/loginUser.dto';
import { TokenModel } from './model/token.model';
import { RegisterUserDto } from './dto/registerUser.dto';
import { BetDto } from './dto/bet.dto';
import { simulatePlinkoDrop } from 'src/utils/bet';
import { BetResultModel } from './model/betResult.model';
import { DepositDto } from './dto/deposit.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  public getWithJwtToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }

  public async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(ConstantMessages.EmailOrPasswordNotMatched);
    }
    const valid = await user.validatePassword(password);
    if (!valid) {
      throw new NotFoundException(ConstantMessages.EmailOrPasswordNotMatched);
    }
    return user;
  }

  public async logIn(dto: LoginUserDto): Promise<TokenModel> {
    const user = await this.getAuthenticatedUser(dto.email, dto.password);
    const token = this.getWithJwtToken(user);
    return token;
  }

  public async getById(userId): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return user;
  }
  public async register(dto: RegisterUserDto): Promise<UserEntity> {
    let user = new UserEntity();
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user = await user.save();
    return user;
  }

  public async executeBet(
    dto: BetDto,
    userId: number,
  ): Promise<BetResultModel> {
    let user = await this.usersRepository.findOneBy({ id: userId });
    if (user.balance < dto.betSize) {
      throw new ForbiddenException(ConstantMessages.InsufficientBalance);
    }
    const [result, resultIndex] = simulatePlinkoDrop();
    const profit = (result - 1) * dto.betSize;
    user.balance += profit;
    user = await user.save();
    return {
      result,
      resultIndex,
      profit,
      balance: user.balance,
    };
  }

  public async deposit(dto: DepositDto, userId: number): Promise<UserEntity> {
    let user = await this.usersRepository.findOneBy({ id: userId });
    if (0 >= dto.depositAmount) {
      throw new ForbiddenException(ConstantMessages.InsufficientBalance);
    }
    user.balance += dto.depositAmount;
    user = await user.save();
    return user;
  }
}
