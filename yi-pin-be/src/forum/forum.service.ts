import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { DbService } from '../db/db.service';
import { Forum, ForumInter } from './entities/forum.entity';
import { ServiceResult } from '../exception/exception';

@Injectable()
export class ForumService {
  constructor(private readonly dbService: DbService) {}

  async create(createForumDto: CreateForumDto, uid: string) {
    const newForum = new Forum();
    newForum.author = uid;
    newForum.title = createForumDto.title;
    newForum.type = createForumDto.type;
    newForum.content = createForumDto.content;
    return await this.dbService.createForum(newForum);
  }

  async findAllForums(type: ForumInter['type'], uid: string) {
    return await this.dbService.findAllForums(type, uid);
  }

  async findOneForum(fid: string, uid?: string) {
    if ((await this.dbService.hasForum(fid)).data) {
      return await this.dbService.findOneForum(fid, uid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }

  async findAllUserWorkForum(uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return await this.dbService.findAllUserWorkForum(uid);
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async findAllUserLikeForum(uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return await this.dbService.findAllUserLikeForum(uid);
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async findAllUserCollectionForum(uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return await this.dbService.findAllUserCollectionForum(uid);
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async findAllUserCommentForum(uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return await this.dbService.findAllUserCommentForum(uid);
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async removeForum(uid: string, fid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      if ((await this.dbService.hasForum(fid)).data) {
        if ((await this.dbService.ifUserWroteForum(uid, fid)).data) {
          return await this.dbService.removeForum(uid, fid);
        } else {
          throw ServiceResult.userUnauthorized();
        }
      } else {
        throw ServiceResult.forumDontExists();
      }
    } else {
      throw ServiceResult.userDontExists();
    }
  }
}
