import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Forum, ForumInter } from '../forum/entities/forum.entity';
import { Collection } from '../collection/entities/collection.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Like } from '../like/entities/like.entity';
import { ServiceResult } from '../exception/exception';
import { CommentLike } from '../comment-like/entities/comment-like.entity';

@Injectable()
export class DbService {
  private readonly dataSource = new DataSource({
    type: 'mysql',
    username: 'root',
    host: '127.0.0.1',
    password: '',
    database: 'yp',
    entities: [User, Forum, Collection, Comment, Like, CommentLike],
    logging: true,
    logger: 'advanced-console',
    synchronize: true,
  });

  private readonly userRepository: Repository<User>;
  private readonly forumRepository: Repository<Forum>;
  private readonly collectionRepository: Repository<Collection>;
  private readonly commentRepository: Repository<Comment>;
  private readonly likeRepository: Repository<Like>;
  private readonly commentLikeRepository: Repository<CommentLike>;

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
    // 评论点赞数据库
    this.commentLikeRepository = this.dataSource.getRepository(CommentLike);
  }

  /**
   * 是否能按照uid找到用户
   */
  async hasUser(uid: string): Promise<ServiceResult> {
    return ServiceResult.ok(
      (await this.userRepository.countBy({
        uid,
      })) > 0,
    );
  }

  /**
   * # User
   * ## C（增加）
   * 注册一个用户。唯一的往 user 数据库中添加条目的方法。
   * @param user
   */
  async userRegister(user: User) {
    if ((await this.hasUser(user.uid)).data) {
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
      (await this.forumRepository.countBy({
        id: fid,
      })) > 0,
    );
  }

  /**
   * 创建帖子
   */
  async createForum(forum: Forum) {
    await this.forumRepository.save(forum);
    return ServiceResult.ok();
  }

  /**
   * 获取所有帖子简略信息（列表展示）
   */
  async findAllForums(type: ForumInter['type'], uid?: string) {
    const allForums = await this.forumRepository.findBy({
      type,
    });
    const allData = [];
    for (let i = 0; i < allForums.length; ++i) {
      const f = allForums[i];
      const data: any = {
        id: f.id,
        title: f.title,
        createTime: f['create-time'],
        like: {
          num: (await this.getForumLikeNum(f.id)).data,
        },
        collection: {
          num: (await this.getAllForumCollectionNum(f.id)).data,
        },
        commentNum: (await this.getForumCommentNum(f.id)).data,
      };
      if (uid !== undefined) {
        data.like.ifLiked = (await this.ifUserLikeForum(uid, f.id)).data;
        if (data.like.ifLiked) {
          data.like.id = (await this.userLikeIdOfForum(uid, f.id)).data;
        }
        data.collection.ifCollected = (
          await this.ifUserCollectForum(uid, f.id)
        ).data;
        if (data.collection.ifCollected) {
          data.collection.id = (
            await this.userCollectionIdOfForum(uid, f.id)
          ).data;
        }
      }
      allData.push(data);
    }
    return ServiceResult.ok(allData);
  }

  /**
   * 获取一个帖子的详细信息，发送给前端
   */
  async findOneForum(fid: string, uid?: string) {
    const forum = await this.forumRepository.findOneBy({
      id: fid,
    });
    const forumData: any = {
      id: fid,
      content: forum.content,
      title: forum.title,
      createTime: forum['create-time'],
      type: forum.type,
      author: (await this.userSafeProfile(forum.author)).data,
      like: {
        num: (await this.getForumLikeNum(fid)).data,
      },
      collection: {
        num: (await this.getAllForumCollectionNum(fid)).data,
      },
      comments: (await this.getForumComments(fid, uid)).data,
    };
    if (uid !== undefined) {
      if (
        (forumData.like.ifLiked = (await this.ifUserLikeForum(uid, fid)).data)
      ) {
        forumData.like.id = (await this.userLikeIdOfForum(uid, fid)).data;
      }
      if (
        (forumData.collection.ifCollected = (
          await this.ifUserCollectForum(uid, fid)
        ).data)
      ) {
        forumData.collection.id = (
          await this.userCollectionIdOfForum(uid, fid)
        ).data;
      }
    }
    return ServiceResult.ok(forumData);
  }

  /**
   * 收藏已经存在
   */
  async hasCollection(id: string) {
    return ServiceResult.ok(
      (await this.collectionRepository.countBy({
        id,
      })) > 0,
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
      return ServiceResult.ok(collection);
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
  async getAllForumCollectionNum(fid: string) {
    return ServiceResult.ok(
      await this.collectionRepository.countBy({
        fid,
      }),
    );
  }

  /**
   * 用户取消收藏
   */
  async cancelCollection(id: string) {
    await this.collectionRepository.delete({
      id,
    });
    ServiceResult.ok();
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
   * 获取某个 forum 的所有评论
   */
  async getForumComments(fid: string, uid?: string) {
    const comments = await this.commentRepository.findBy({
      fid,
    });
    const commentsData = [];
    for (const comment of comments) {
      const author: User = (await this.userSafeProfile(comment.author)).data;
      const commentData: any = {
        id: comment.id, // 评论的 id
        content: comment.content, // 评论的内容
        time: comment.time, // 评论的时间
        author: {
          // 评论的作者
          account: author.account, // 评论作者的 账号
          profile: author.profile, // 评论作者的 头像
          nickname: author.nickname, // 评论作者的 昵称
        },
      };
      // 评论点赞相关信息
      const like: {
        num: number; // 点赞的数量
        ifLiked?: boolean; // 用户是否点赞 (仅用户登录）
        id?: string; // 用户点赞的 Id （仅用户登录且点赞）
      } = {
        num: (await this.getCommentLikeNumOfComment(comment.id)).data,
      };
      if (uid !== undefined) {
        like.ifLiked = (await this.ifUserLikeComment(uid, comment.id)).data;
        if (like.ifLiked === true) {
          like.id = (await this.findUserLikeOfComment(uid, comment.id)).data.id;
        }
      }
      commentData.like = like;
      commentsData.push(commentData);
    }
    return ServiceResult.ok(commentsData);
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

  async findUserLikeOfComment(uid: string, cid: string) {
    return ServiceResult.ok(
      await this.commentLikeRepository.findOneBy({
        uid,
        cid,
      }),
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
      return ServiceResult.ok(like);
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
   * 用户取消点赞
   */
  async removeLike(id: string) {
    await this.likeRepository.remove(
      await this.likeRepository.findOneBy({
        id,
      }),
    );
    return ServiceResult.ok();
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

  /**
   * 用户对特定 forum 的点赞 id
   */
  async userLikeIdOfForum(uid: string, fid: string) {
    return ServiceResult.ok(
      (
        await this.likeRepository.findOneBy({
          uid,
          fid,
        })
      )?.id,
    );
  }

  /**
   * 用户对特定 forum 的收藏 id
   */
  async userCollectionIdOfForum(uid: string, fid: string) {
    return ServiceResult.ok(
      (
        await this.collectionRepository.findOneBy({
          uid,
          fid,
        })
      )?.id,
    );
  }

  /**
   * 评论点赞
   */
  async createCommentLike(commentLike: CommentLike) {
    await this.commentLikeRepository.save(commentLike);
    return ServiceResult.ok(commentLike);
  }

  /**
   * 评论点赞是否存在
   */
  async hasCommentLike(id: string) {
    return ServiceResult.ok(
      (await this.commentLikeRepository.findOneBy({
        id,
      })) !== null,
    );
  }

  /**
   * 取消评论点赞
   */
  async cancelCommentLike(id: string) {
    await this.commentLikeRepository.delete({
      id,
    });
    return ServiceResult.ok();
  }

  /**
   * 用户是否点赞评论
   */
  async ifUserLikeComment(uid: string, cid: string) {
    return ServiceResult.ok(
      (await this.commentLikeRepository.countBy({
        uid,
        cid,
      })) > 0,
    );
  }

  /**
   * 获取评论的赞数
   */
  async getCommentLikeNumOfComment(cid: string) {
    return ServiceResult.ok(
      await this.commentLikeRepository.countBy({
        cid,
      }),
    );
  }

  /**
   * 删除一个收藏
   * @param id
   */
  async removeCollection(id: string) {
    await this.collectionRepository.remove(
      await this.collectionRepository.findOneBy({
        id,
      }),
    );
    return ServiceResult.ok();
  }

  /**
   * 删除一个点赞评论
   */
  async removeCommentLike(id: string) {
    await this.commentLikeRepository.remove(
      await this.commentLikeRepository.findOneBy({
        id,
      }),
    );
    return ServiceResult.ok();
  }
}
