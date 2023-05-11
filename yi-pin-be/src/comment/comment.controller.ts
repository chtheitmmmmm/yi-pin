import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ServiceResult, WrapResult } from '../exception/exception';

@Controller('/api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('public')
  @WrapResult
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.commentService.create(createCommentDto, uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  @Get('/forum/num')
  @WrapResult
  async getForumCommentNum(@Query('fid') fid: string | undefined) {
    if (fid !== undefined) {
      return await this.commentService.getForumCommentNum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }
}
