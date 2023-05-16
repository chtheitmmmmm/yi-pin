import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import * as cookieParser from 'cookie';
import { Result, ServiceResult, WrapResult } from '../exception/exception';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @WrapResult
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = (await this.userService.register(createUserDto)).data; // 注册用户
    res.setHeader('Set-Cookie', `uid=${user.uid}; path=/`); // 发送凭证
    res.send(Result.withAuto(ServiceResult.ok(user)));
  }

  /**
   * 用户登录
   * @param account {string} Query参数——账号
   * @param password {string} Query参数——密码
   * @param res {Response} 下层响应对象
   * @returns {User} 返回用户数据
   * @throws {string}
   *
   *  - 需要 account 和 password 两个参数
   *  - 当账号未注册
   *  - 当账号、密码不匹配
   */
  @Get('login')
  @WrapResult
  async login(
    @Query('account') account,
    @Query('password') password,
    @Res() res: Response,
  ) {
    const user = (await this.userService.login(account, password)).data;
    res.setHeader('Set-Cookie', `uid=${user.uid}; path=/`);
    res.send(Result.withAuto(ServiceResult.ok(user)));
  }

  /**
   * 根据用户浏览器发送的 cookie 自动登录
   * @param cookieString {string} 可能包含用户的 UIDc的cookie
   * @return {User} 返回用户的数据
   * @throws {string}
   *
   * - 当cookie无法对应用户数据抛出异常
   */
  @Get('autologin')
  @WrapResult
  async autoLogin(@Headers('Cookie') cookieString: string | undefined) {
    if (cookieString) {
      const cookie = cookieParser.parse(cookieString) as { uid?: string };
      if (cookie.uid) {
        return await this.userService.autoLogin(cookie.uid);
      } else {
        throw ServiceResult.userDontExists();
      }
    }
  }

  /**
   * @param uid {string} 用户uid
   */
  @Get('safe-profile')
  @WrapResult
  async safeProfile(@Query('uid') uid: string | undefined) {
    if (uid !== undefined) {
      return await this.userService.safeProfile(uid);
    } else {
      throw ServiceResult.userDontExists();
    }
  }
}
