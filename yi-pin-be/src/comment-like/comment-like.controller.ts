import {Controller, Post, Body, Headers, Delete, Param} from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import {ServiceResult, WrapResult} from '../exception/exception';

@Controller('/api/comment-like')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @Post()
  @WrapResult
  async create(
    @Body() createCommentLikeDto: CreateCommentLikeDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.commentLikeService.create(createCommentLikeDto, uid);
    } else {
      return ServiceResult.userUnauthorized();
    }
  }

  @Delete(':id')
  @WrapResult
  async cancel(
    @Param('id') cid: string,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.commentLikeService.remove(uid, cid);
    } else {
      return ServiceResult.userUnauthorized();
    }
  }
}
