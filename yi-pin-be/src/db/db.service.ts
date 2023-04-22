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
}
