import { Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DbService {
  private readonly dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "bi0edcbcgh",
    database: "yp",
    entities: [User],
    synchronize: true
  })

  private readonly userRepository: Repository<User>

  constructor() {
    this.dataSource.initialize()
      .catch(reason => {
        throw reason
      })
    this.userRepository = this.dataSource.getRepository(User)
  }

  /**
   * # User
   * ## C（增加）
   * 注册一个用户。唯一的往 user 数据库中添加条目的方法。
   * @param user
   */
  async userRegister(user: User) {
    if (await this.userRepository.findOneBy({
      uid: user.uid
    })) {
      throw "用户已注册"
    }
    await this.userRepository.save(user)
  }

  /**
   * # User
   * ## R
   * @param account
   * @param password
   */
  async userLogin(account: string, password: string) {
    const user = await this.userRepository.findOneBy({
      account
    })
    if (user) {
      if (user.password !== password) {
        throw "密码错误"
      }
    } else {
      throw "用户未注册"
    }
    return user
  }

  /**
   * 客户端通过 cookie 获取用户账号信息
   * @param uid
   */
  async userAutoLogin(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid
    })
    if (!user) {
      throw "无效的 cookie"
    }
    return user
  }
}
