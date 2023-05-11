import { Controller, Get, Post, Body, Headers, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { ServiceResult, WrapResult } from '../exception/exception';

@Controller('/api/forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('public')
  @WrapResult
  async create(
    @Body() createForumDto: CreateForumDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.forumService.create(createForumDto, uid);
    } else {
      // 用户没有 authorization
      throw ServiceResult.userUnauthorized();
    }
  }

  @Get('list/forum')
  @WrapResult
  async findAllForumForum(@Query('uid') uid: string | undefined) {
    if (uid !== undefined) {
      return await this.forumService.findAllForumForum(uid);
    } else {
      return await this.forumService.findAllForumForumNoAuth();
    }
  }

  @Get('list/consult')
  @WrapResult
  async findAllConsultForum(@Query('uid') uid: string | undefined) {
    if (uid !== undefined) {
      return await this.forumService.findAllConsultForum(uid);
    } else {
      return await this.forumService.findAllConsultForumNoAuth();
    }
  }

  @Get('item')
  @WrapResult
  async findOneForum(@Query('fid') fid: string | undefined) {
    if (fid !== undefined) {
      return await this.forumService.findOneForum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }
}
