import { Injectable } from '@nestjs/common';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { DbService } from '../db/db.service';
import { ServiceResult } from '../exception/exception';
import { CommentLike } from './entities/comment-like.entity';

@Injectable()
export class CommentLikeService {
  constructor(private readonly dbService: DbService) {}

  async create(createCommentLikeDto: CreateCommentLikeDto, uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      if ((await this.dbService.hasComment(createCommentLikeDto.cid)).data) {
        if (
          (
            await this.dbService.ifUserLikeComment(
              uid,
              createCommentLikeDto.cid,
            )
          ).data
        ) {
          throw ServiceResult.userHasLike();
        }
        const newCommentLike = new CommentLike();
        newCommentLike.uid = uid;
        newCommentLike.cid = createCommentLikeDto.cid;
        return await this.dbService.createCommentLike(newCommentLike);
      } else {
        throw ServiceResult.commentDontExists();
      }
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  async remove(uid: string, cid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      return this.dbService.removeCommentLike(cid);
    } else {
      return ServiceResult.userUnauthorized();
    }
  }
}
