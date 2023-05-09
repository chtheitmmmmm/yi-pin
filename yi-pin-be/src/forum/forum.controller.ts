import {Controller, Get, Post, Body, Headers, Query, BadRequestException} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { DbService } from '../db/db.service';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';

@Controller('/api/forum')
export class ForumController {
  constructor(
    private readonly forumService: ForumService,
    private readonly dbService: DbService,
  ) {}

  @Post('public')
  async create(
    @Body() createForumDto: CreateForumDto,
    @Headers('Authorization') uid: string,
  ) {
    if (uid && (await this.dbService.hasUser(uid))) {
      return await this.forumService.create(createForumDto, uid);
    } else {
      // 用户没有 authorization
      throw new UserUnauthorizedException();
    }
  }

  @Get('list/forum')
  async findAllForumForum() {
    return await this.dbService.findAllForumForum();
  }

  @Get('list/consult')
  async findAllConsultForum() {
    return await this.dbService.findAllConsultForum();
  }

  @Get('item')
  async findOneForum(@Query('fid') fid: string) {
    if (fid) {
      return await this.dbService.findOneForum(fid);
    } else {
      throw new BadRequestException('需要制定帖子的ID');
    }
  }
}
