import {Controller, Get, Post, Body, Param, Delete, Headers, Query, BadRequestException} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';

@Controller('/api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('public')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Headers('Authorization') uid: string,
  ) {
    if (uid) {
      return this.commentService.create(createCommentDto, uid);
    } else {
      throw new UserUnauthorizedException();
    }
  }

  @Get('/forum/num')
  async getForumCommentNum(@Query('fid') fid) {
    if (fid) {
      return await this.commentService.getForumCommentNum(fid);
    } else {
      throw new BadRequestException('请求参数没有带上帖子 id');
    }
  }
}
