import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DbService } from '../db/db.service';
import { Comment } from './entities/comment.entity';
import { ServiceResult } from '../exception/exception';

@Injectable()
export class CommentService {
  constructor(private readonly dbService: DbService) {}

  async create(createCommentDto: CreateCommentDto, uid: string) {
    if ((await this.dbService.hasUser(uid)).data) {
      const newComment = new Comment();
      newComment.author = uid;
      newComment.fid = createCommentDto.fid;
      newComment.content = createCommentDto.content;
      return await this.dbService.createComment(newComment);
    } else {
      throw ServiceResult.userDontExists();
    }
  }

  /**
   * 获取 `fid` 对应论坛的所有评论数目
   * @param fid
   */
  async getForumCommentNum(fid: string) {
    if ((await this.dbService.hasForum(fid)).data) {
      return await this.dbService.getForumCommentNum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }
}
