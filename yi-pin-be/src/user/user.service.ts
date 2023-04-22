import { Injectable } from '@nestjs/common';
import uuid from "uuid";
import { User } from './user';
import { DbService } from '../db/db.service';

interface LoginMsg {
  code: number,
  msg: string
}

// 登录成功
const LoginOk: LoginMsg = {
  code: 0,
  msg: 'ok'
}

const LoginInvalidUUID: LoginMsg = {
  code: 1,
  msg: "UUID invalid"
}

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async register(user: User) {
    await this.db.userRegister(user)
  }

  async login(account: string, password: string) {
    return await this.db.userLogin(account, password)
  }

  async autoLogin(cookie: string) {
    return await this.db.userAutoLogin(cookie)
  }
}
