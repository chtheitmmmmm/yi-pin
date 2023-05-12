import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Query,
  ParseIntPipe,
  Param,
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
}
