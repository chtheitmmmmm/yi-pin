import { Body, Controller, Post, Res } from '@nestjs/common';
import { User, UserRegisterInfo } from './user';
import { UserService } from './user.service';
import { Response } from 'express';
import { userRegisterPipe } from './user.dto';


@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {}

  @Post("register")
  async register(
    @Body(userRegisterPipe)
    userRegisterInfo: UserRegisterInfo,
    @Res() res: Response
  ) {
    const user = new User(userRegisterInfo)
    await this.service.register(user) // 注册用户
    res.setHeader('Set-Cookie', `uuid=${user.uid}; HttpOnly`) // 发送 cookie
  }
}
