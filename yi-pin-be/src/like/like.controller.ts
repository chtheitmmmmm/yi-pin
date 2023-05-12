import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ServiceResult, WrapResult } from '../exception/exception';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @WrapResult
  async create(
    @Body() createLikeDto: CreateLikeDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.likeService.create(createLikeDto, uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  @Get('forum/num')
  @WrapResult
  async getForumLikeNum(@Query('fid') fid: string | undefined) {
    if (fid !== undefined) {
      return await this.likeService.getForumLikeNum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }

  @Delete(':id')
  @WrapResult
  async cancel(
    @Param('id') lid: string,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.likeService.remove(lid, uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }
}
