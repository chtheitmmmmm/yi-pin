import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DbService } from '../db/db.service';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';
import { Comment } from './entities/comment.entity';
import { ForumNotFoundException } from '../exception/forum-not-found.exception';

@Injectable()
export class CommentService {
  constructor(private readonly dbService: DbService) {}

  async create(createCommentDto: CreateCommentDto, uid: string) {
    if (await this.dbService.hasUser(uid)) {
      const newComment = new Comment();
      newComment.author = uid;
      newComment.fid = createCommentDto.fid;
      newComment.content = createCommentDto.content;
      await this.dbService.createComment(newComment);
    } else {
      throw new UserUnauthorizedException();
    }
  }

  async getForumCommentNum(fid: string) {
    if (await this.dbService.hasForum(fid)) {
      return await this.dbService.getForumCommentNum(fid);
    } else {
      throw new ForumNotFoundException();
    }
  }
}
