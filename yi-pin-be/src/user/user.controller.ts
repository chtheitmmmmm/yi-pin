import { Body, Controller, Get, Headers, Post, Query, Res } from '@nestjs/common';
import { User, UserRegisterInfo } from './user';
import { UserService } from './user.service';
import { Response } from 'express';
import { userRegisterPipe } from './user.dto';
import * as cookieParser from "cookie"


@Controller('api/user')
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
    res.setHeader('Set-Cookie', `uid=${user.uid}; path=/`) // 发送凭证
    res.send(user)
  }

  /**
   * 用户登录
   * @param account {string} Query参数——账号
   * @param password {string} Query参数——密码
   * @returns {User} 返回用户数据
   * @throws {string}
   *
   *  - 需要 account 和 password 两个参数
   *  - 当账号未注册
   *  - 当账号、密码不匹配
   */
  @Get("login")
  async login(
    @Query("account") account,
    @Query("password") password,
    @Res() res: Response,
  ) {
    const user = await this.service.login(account, password)
    res.setHeader('Set-Cookie', `uid=${user.uid}; path=/`)
    res.send(user)
  }

  /**
   * 根据用户浏览器发送的 cookie 自动登录
   * @param cookieString {string} 可能包含用户的 UIDc的cookie
   * @return {User} 返回用户的数据
   * @throws {string}
   *
   * - 当cookie无法对应用户数据抛出异常
   */
  @Get("autologin")
  async autoLogin(
    @Headers("Cookie") cookieString: string | undefined,
  ) {
    if (cookieString) {
      const cookie = cookieParser.parse(cookieString) as { uid?: string }
      if (cookie.uid) {
        return await this.service.autoLogin(cookie.uid)
      } else {
        throw {
          statusCode: 401,
          message: "没有有效 cookie",
          code: 1
        }
      }
    }
  }
}
