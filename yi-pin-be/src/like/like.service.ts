import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { DbService } from '../db/db.service';
import { Like } from './entities/like.entity';
import { ServiceResult } from '../exception/exception';

@Injectable()
export class LikeService {
  constructor(private readonly dbService: DbService) {}

  async create(createLikeDto: CreateLikeDto, uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      if ((await this.dbService.hasForum(createLikeDto.fid)).data) {
        const newLike = new Like();
        newLike.uid = uid;
        newLike.fid = createLikeDto.fid;
        return await this.dbService.createLike(newLike);
      } else {
        throw ServiceResult.forumDontExists();
      }
    } else {
      throw ServiceResult.userDontExists();
    }
  }
}
