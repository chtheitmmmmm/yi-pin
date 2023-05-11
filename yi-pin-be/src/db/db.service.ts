import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Forum, ForumInter } from '../forum/entities/forum.entity';
import { Collection } from '../collection/entities/collection.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Like } from '../like/entities/like.entity';
import { ServiceResult } from '../exception/exception';

@Injectable()
export class DbService {
  private readonly dataSource = new DataSource({
    type: 'mysql',
    username: 'root',
    host: '127.0.0.1',
    password: '',
    database: 'yp',
    entities: [User, Forum, Collection, Comment, Like],
    logging: true,
    logger: 'advanced-console',
    synchronize: true,
  });

  private readonly userRepository: Repository<User>;
  private readonly forumRepository: Repository<Forum>;
  private readonly collectionRepository: Repository<Collection>;
  private readonly commentRepository: Repository<Comment>;
  private readonly likeRepository: Repository<Like>;

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
    // 点赞数据库
    this.likeRepository = this.dataSource.getRepository(Like);
  }
  /**
   * 是否能按照uid找到用户
   */
  async hasUser(uid: string): Promise<ServiceResult> {
    return ServiceResult.ok(
      (await this.userRepository.findOneBy({
        uid,
      })) !== null,
    );
  }

  /**
   * # User
   * ## C（增加）
   * 注册一个用户。唯一的往 user 数据库中添加条目的方法。
   * @param user
   */
  async userRegister(user: User) {
    if (
      (await this.userRepository.findOneBy({
        account: user.account,
      })) !== null
    ) {
      throw ServiceResult.userHasExisted();
    } else {
      await this.userRepository.save(user);
      return ServiceResult.ok(user);
    }
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
    if (user === null) {
      throw ServiceResult.userDontExists();
    } else {
      if (user.password !== password) {
        throw ServiceResult.userPasswordWrong();
      } else {
        return ServiceResult.ok(user);
      }
    }
  }

  /**
   * 客户端通过 cookie 获取用户账号信息
   * @param uid
   */
  async userAutoLogin(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid,
    });
    if (user === null) {
      throw ServiceResult.userDontExists();
    } else {
      return ServiceResult.ok(user);
    }
  }

  /**
   * 获取安全信息
   * @param uid
   */
  async userSafeProfile(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid,
    });
    if (user === null) {
      throw ServiceResult.userDontExists();
    } else {
      return ServiceResult.ok({
        uid: user.uid,
        nickname: user.nickname,
        account: user.account,
        profile: user.profile,
        type: user.type,
      });
    }
  }

  /**
   * 是否能按照fid找到forum
   */
  async hasForum(fid: string) {
    return ServiceResult.ok(
      (await this.forumRepository.findOneBy({
        id: fid,
      })) !== null,
    );
  }

  /**
   * 创建帖子
   */
  async createForum(forum: Forum) {
    await this.forumRepository.save(forum);
    return ServiceResult.ok();
  }

  async findAllForum(uid: string, type: ForumInter['type']) {
    const allForums = await this.forumRepository.findBy({
      type,
    });
    const allData = [];
    for (let i = 0; i < allForums.length; ++i) {
      const f = allForums[i];
      allData[i] = {
        id: f.id,
        title: f.title,
        'create-time': f['create-time'],
        like: (await this.getForumLikeNum(f.id)).data,
        collection: (await this.findAllForumCollectionNum(f.id)).data,
        comment: (await this.getForumCommentNum(f.id)).data,
        ifLike: (await this.ifUserLikeForum(uid, f.id)).data,
        ifCollected: (await this.ifUserCollectForum(uid, f.id)).data,
      };
    }
    return ServiceResult.ok(allData);
  }

  /**
   * 获取所有论坛帖子，用于列表显示
   */
  async findAllForumForum(uid: string) {
    return await this.findAllForum(uid, 0);
  }

  /**
   * 获取所有的咨询帖子，用于列表展示
   */
  async findAllConsultForum(uid: string) {
    return await this.findAllForum(uid, 1);
  }

  /**
   * 游客模式查看所有帖子
   */
  async findAllForumNoAuth(type: ForumInter['type']) {
    const allForums = await this.forumRepository.findBy({
      type,
    });
    const allData = [];
    for (let i = 0; i < allForums.length; ++i) {
      const f = allForums[i];
      allData[i] = {
        id: f.id,
        title: f.title,
        'create-time': f['create-time'],
        like: (await this.getForumLikeNum(f.id)).data,
        collection: (await this.findAllForumCollectionNum(f.id)).data,
        comment: (await this.getForumCommentNum(f.id)).data,
      };
    }
    return ServiceResult.ok(allData);
  }

  /**
   * 游客模式查看所有论坛帖子
   */
  async findAllForumForumNoAuth() {
    return await this.findAllForumNoAuth(0);
  }

  /**
   * 游客模式查看所有咨询帖子
   */
  async findAllConsultForumNoAuth() {
    return await this.findAllForumNoAuth(1);
  }

  /**
   * 获取一个帖子的详细信息，用于展示
   */
  async findOneForum(id: string) {
    if ((await this.hasForum(id)).data) {
      return ServiceResult.ok(
        await this.forumRepository.findOneBy({
          id,
        }),
      );
    } else {
      throw ServiceResult.forumDontExists();
    }
  }

  /**
   * 收藏已经存在
   */
  async hasCollection(id: string) {
    return ServiceResult.ok(
      (await this.collectionRepository.findOneBy({
        id,
      })) !== null,
    );
  }

  /**
   * 创建收藏
   */
  async createCollection(collection: Collection) {
    if ((await this.hasCollection(collection.id)).data) {
      throw ServiceResult.collectionHasExisted();
    } else {
      await this.collectionRepository.save(collection);
      return ServiceResult.ok();
    }
  }

  /**
   * 找到用户的所有收藏
   */
  async findAllUserCollection(uid: string) {
    return ServiceResult.ok(
      await this.collectionRepository.findBy({
        uid,
      }),
    );
  }

  /**
   * 找到对应forum的collection数目
   */
  async findAllForumCollectionNum(fid: string) {
    return ServiceResult.ok(
      await this.collectionRepository.countBy({
        fid,
      }),
    );
  }

  /**
   * 是否已经有 comment
   */
  async hasComment(id: string) {
    return ServiceResult.ok(
      (await this.commentRepository.findOneBy({
        id,
      })) !== null,
    );
  }

  /**
   * 创建 comment
   */
  async createComment(comment: Comment) {
    if ((await this.hasComment(comment.id)).data) {
      throw ServiceResult.commentHasExisted();
    } else {
      await this.commentRepository.save(comment);
      return ServiceResult.ok();
    }
  }

  /**
   * 获取某个 forum 的评论数目
   */
  async getForumCommentNum(fid: string) {
    return ServiceResult.ok(
      await this.commentRepository.countBy({
        fid,
      }),
    );
  }

  /**
   * 点赞是否存在
   */
  async hasLike(id: string) {
    return ServiceResult.ok(
      (await this.likeRepository.findOneBy({
        id,
      })) !== null,
    );
  }

  /**
   * 新建点赞
   */
  async createLike(like: Like) {
    if ((await this.hasLike(like.id)).data) {
      throw ServiceResult.likeHasExisted();
    } else {
      await this.likeRepository.save(like);
      return ServiceResult.ok();
    }
  }

  /**
   * 获取帖子的赞数
   */
  async getForumLikeNum(fid: string) {
    if ((await this.hasForum(fid)).data) {
      return ServiceResult.ok(
        await this.likeRepository.countBy({
          fid,
        }),
      );
    } else {
      return ServiceResult.forumDontExists();
    }
  }

  /**
   * 获取用户是否点赞过该内容
   */
  async ifUserLikeForum(uid: string, fid: string) {
    return ServiceResult.ok(
      (await this.likeRepository.countBy({
        uid,
        fid,
      })) > 0,
    );
  }

  /**
   * 获取用户是否收藏过该内容
   * @param uid
   * @param fid
   */
  async ifUserCollectForum(uid: string, fid: string) {
    return ServiceResult.ok(
      (await this.collectionRepository.countBy({
        uid,
        fid,
      })) > 0,
    );
  }
}
