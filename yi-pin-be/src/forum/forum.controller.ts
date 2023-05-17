import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Query,
  ParseIntPipe,
  Param, Delete,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { ServiceResult, WrapResult } from '../exception/exception';

@Controller('/api/forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @WrapResult
  async create(
    @Body() createForumDto: CreateForumDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.forumService.create(createForumDto, uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  @Get()
  @WrapResult
  async findAllForumForum(
    @Query('type', ParseIntPipe) type: number | undefined,
    @Query('uid') uid: string | undefined,
  ) {
    if (type !== 0 && type !== 1) {
      throw ServiceResult.forumTypeNotValid();
    } else {
      return await this.forumService.findAllForums(type, uid);
    }
  }

  @Get(':id')
  @WrapResult
  async findOneForum(
    @Param('id') fid: string,
    @Query('uid') uid: string | undefined,
  ) {
    return await this.forumService.findOneForum(fid, uid);
  }

  @Get('user/work/:uid')
  @WrapResult
  async findAllUserWorkForum(@Param('uid') uid: string) {
    return await this.forumService.findAllUserWorkForum(uid);
  }

  @Get('user/like/:uid')
  @WrapResult
  async findAllUserLikeForum(@Param('uid') uid: string) {
    return await this.forumService.findAllUserLikeForum(uid);
  }

  @Get('user/collection/:uid')
  @WrapResult
  async findAllUserCollectionForum(@Param('uid') uid: string) {
    console.log('run me');
    return await this.forumService.findAllUserCollectionForum(uid);
  }

  @Get('user/comment/:uid')
  @WrapResult
  async findAllUserCommentForum(@Param('uid') uid: string) {
    return await this.forumService.findAllUserCommentForum(uid);
  }

  @Delete(':id')
  @WrapResult
  async removeForum(
    @Param('id') fid: string,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.forumService.removeForum(uid, fid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }
}
