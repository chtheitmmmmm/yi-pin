import { Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { DataSource, Repository } from 'typeorm';
import { Forum } from '../forum/entities/forum.entity';
import { Collection } from '../collection/entities/collection.entity';
import { Comment } from '../comment/entities/comment.entity';
import { ForumNotFoundException } from '../exception/forum-not-found.exception';

@Injectable()
export class DbService {
  private readonly dataSource = new DataSource({
    type: 'mysql',
    username: 'root',
    host: '127.0.0.1',
    password: '',
    database: 'yp',
    entities: [User, Forum, Collection, Comment],
    logging: true,
    logger: 'advanced-console',
    synchronize: true,
  });

  private readonly userRepository: Repository<User>;
  private readonly forumRepository: Repository<Forum>;
  private readonly collectionRepository: Repository<Collection>;
  private readonly commentRepository: Repository<Comment>;

  constructor() {
    this.dataSource.initialize().catch((reason) => {
      throw reason;
    });
    // 用户数据库
    this.userRepository = this.dataSource.getRepository(User);
    // 帖子数据库
    this.forumRepository = this.dataSource.getRepository(Forum);
    // 收藏数据库
    this.collectionRepository = this.dataSource.getRepository(Collection);
    // 评论数据库
    this.commentRepository = this.dataSource.getRepository(Comment);
  }

  /**
   * 是否能按照uid找到用户
   */
  async hasUser(uid: string) {
    return (
      (await this.userRepository.findOneBy({
        uid,
      })) !== null
    );
  }

  /**
   * # User
   * ## C（增加）
   * 注册一个用户。唯一的往 user 数据库中添加条目的方法。
   * @param user
   */
  async userRegister(user: User) {
    if (await this.hasUser(user.uid)) {
      throw {
        statusCode: 403,
        message: '用户已注册',
      };
    }
    await this.userRepository.save(user);
  }

  /**
   * # User
   * ## R
   * @param account
   * @param password
   */
  async userLogin(account: string, password: string) {
    const user = await this.userRepository.findOneBy({
      account,
    });
    if (user) {
      if (user.password !== password) {
        throw {
          statusCode: 403,
          message: '密码错误',
        };
      }
    } else {
      throw {
        statusCode: 403,
        message: '用户未注册',
      };
    }
    return user;
  }

  /**
   * 客户端通过 cookie 获取用户账号信息
   * @param uid
   */
  async userAutoLogin(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid,
    });
    if (!user) {
      throw '无效的 cookie';
    }
    return user;
  }

  /**
   * 获取安全信息
   * @param uid
   */
  async userSafeProfile(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid,
    });
    if (!user) {
      throw '无效的 uid';
    }
    return {
      uid: user.uid,
      nickname: user.nickname,
      account: user.account,
      profile: user.profile,
      type: user.type,
    };
  }

  /**
   * 是否能按照fid找到forum
   */
  async hasForum(fid: string) {
    return (
      (await this.forumRepository.findOneBy({
        id: fid,
      })) !== null
    );
  }

  /**
   * 创建帖子
   */
  async createForum(forum: Forum) {
    await this.forumRepository.save(forum);
  }

  /**
   * 获取所有论坛帖子，用于列表显示
   */
  async findAllForumForum() {
    const allForums = await this.forumRepository.findBy({
      type: 0,
    });
    const allData = [];
    for (let i = 0; i < allForums.length; ++i) {
      const f = allForums[i];
      allData[i] = {
        id: f.id,
        title: f.title,
        'create-time': f['create-time'],
        like: f.like,
        collection: await this.findAllForumCollectionNum(f.id),
        comment: await this.getForumCommentNum(f.id),
      };
    }
    return allData;
  }

  /**
   * 获取所有的咨询帖子，用于列表展示
   */
  async findAllConsultForum() {
    const allForums = await this.forumRepository.findBy({
      type: 1,
    });
    const allData = [];
    for (let i = 0; i < allForums.length; ++i) {
      const f = allForums[i];
      allData[i] = {
        id: f.id,
        title: f.title,
        'create-time': f['create-time'],
        like: f.like,
        collection: await this.findAllForumCollectionNum(f.id),
        comment: await this.getForumCommentNum(f.id),
      };
    }
    return allData;
  }

  /**
   * 获取一个帖子的详细信息，用于展示
   */
  async findOneForum(id: string) {
    if (await this.hasForum(id)) {
      return await this.forumRepository.findOneBy({
        id,
      });
    } else {
      throw new ForumNotFoundException();
    }
  }

  /**
   * 收藏已经存在
   */
  async hasCollection(id: string) {
    return (
      (await this.collectionRepository.findOneBy({
        id,
      })) !== null
    );
  }

  /**
   * 创建收藏
   */
  async createCollection(collection: Collection) {
    if (this.hasCollection(collection.id)) {
      throw {
        errCode: 2,
        errMsg: '创建的收藏已存在',
      };
    } else {
      await this.collectionRepository.save(collection);
    }
  }

  /**
   * 找到用户的所有收藏
   */
  async findAllUserCollection(uid: string) {
    return await this.collectionRepository.findBy({
      uid,
    });
  }

  /**
   * 找到对应forum的collection数目
   */
  async findAllForumCollectionNum(fid: string) {
    return await this.collectionRepository.countBy({
      fid,
    });
  }

  /**
   * 是否已经有 comment
   */
  async hasComment(id: string) {
    return (
      (await this.commentRepository.findOneBy({
        id,
      })) !== null
    );
  }

  /**
   * 创建 comment
   */
  async createComment(comment: Comment) {
    if (await this.hasComment(comment.id)) {
      throw {
        errCode: 2,
        errMsg: '注释已存在',
      };
    } else {
      await this.commentRepository.save(comment);
    }
  }

  /**
   * 获取某个 forum 的评论数目
   */
  async getForumCommentNum(fid: string) {
    return await this.commentRepository.countBy({
      fid,
    });
  }
}
