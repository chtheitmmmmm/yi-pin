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
}
