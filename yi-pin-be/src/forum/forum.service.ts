import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { DbService } from '../db/db.service';
import { Forum } from './entities/forum.entity';

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

  async findAllForumForum(uid: string) {
    return await this.dbService.findAllForumForum(uid);
  }

  async findAllConsultForum(uid: string) {
    return await this.dbService.findAllConsultForum(uid);
  }

  async findAllForumForumNoAuth() {
    return await this.dbService.findAllForumForumNoAuth();
  }

  async findAllConsultForumNoAuth() {
    return await this.dbService.findAllConsultForumNoAuth();
  }

  async findOneForum(fid: string) {
    return await this.dbService.findOneForum(fid);
  }
}
