import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async register(createUserDto: CreateUserDto) {
    const user = new User();
    user.account = createUserDto.account;
    user.password = createUserDto.password;
    return await this.dbService.userRegister(user);
  }

  async login(account: string, password: string) {
    return await this.dbService.userLogin(account, password);
  }

  async autoLogin(cookie: string) {
    return await this.dbService.userAutoLogin(cookie);
  }

  async safeProfile(uid: string) {
    return await this.dbService.userSafeProfile(uid);
  }
}
