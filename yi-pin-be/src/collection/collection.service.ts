import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DbService } from '../db/db.service';
import { Collection } from './entities/collection.entity';
import { ServiceResult } from '../exception/exception';

@Injectable()
export class CollectionService {
  constructor(private readonly dbService: DbService) {}

  async create(createCollectionDto: CreateCollectionDto, uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      if ((await this.dbService.hasForum(createCollectionDto.fid)).data) {
        if (
          (
            await this.dbService.ifUserCollectForum(
              uid,
              createCollectionDto.fid,
            )
          ).data
        ) {
          throw ServiceResult.userHasCollected();
        }
        const newCollection = new Collection();
        newCollection.uid = uid;
        newCollection.fid = createCollectionDto.fid;
        return await this.dbService.createCollection(newCollection);
      } else {
        throw ServiceResult.forumDontExists();
      }
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async findAllUserCollection(uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return await this.dbService.findAllUserCollection(uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  /**
   * 找到一个论坛所有的收藏数
   * @param fid
   */
  async findAllForumCollectionNum(fid: string) {
    if ((await this.dbService.hasForum(fid)).data) {
      return await this.dbService.getAllForumCollectionNum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }

  /**
   * 取消收藏
   */
  async removeCollection(cid: string, uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      if ((await this.dbService.hasCollection(cid)).data) {
        return await this.dbService.removeCollection(cid);
      } else {
        throw ServiceResult.collectionDontExists();
      }
    } else {
      throw ServiceResult.userDontExists();
    }
  }
}
