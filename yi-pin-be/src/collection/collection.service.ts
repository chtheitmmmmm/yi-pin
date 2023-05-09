import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DbService } from '../db/db.service';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';
import { Collection } from './entities/collection.entity';
import {ForumNotFoundException} from "../exception/forum-not-found.exception";

@Injectable()
export class CollectionService {
  constructor(private readonly dbService: DbService) {}

  async create(createCollectionDto: CreateCollectionDto, uid: string) {
    if (await this.dbService.hasUser(uid)) {
      const newCollection = new Collection();
      newCollection.uid = uid;
      newCollection.fid = createCollectionDto.fid;
      await this.dbService.createCollection(newCollection);
    } else {
      throw new UserUnauthorizedException();
    }
  }

  async findAllUserCollection(uid: string) {
    if (await this.dbService.hasUser(uid)) {
      return await this.dbService.findAllUserCollection(uid);
    } else {
      throw new UserUnauthorizedException();
    }
  }

  /**
   * 找到一个论坛所有的收藏数
   * @param fid
   */
  async findAllForumCollectionNum(fid: string) {
    if (await this.dbService.hasForum(fid)) {
      return await this.dbService.findAllForumCollectionNum(fid);
    } else {
      throw new ForumNotFoundException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
