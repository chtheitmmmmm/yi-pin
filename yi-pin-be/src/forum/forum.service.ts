import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
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
    await this.dbService.createForum(newForum);
  }

  async findAll() {
    // todo
    return;
  }

  findOne(id: string) {
    return `This action returns a #${id} forum`;
  }

  update(id: number, updateForumDto: UpdateForumDto) {
    return `This action updates a #${id} forum`;
  }

  remove(id: number) {
    return `This action removes a #${id} forum`;
  }
}
