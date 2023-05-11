import { Controller, Get, Post, Body, Headers, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { ServiceResult, WrapResult } from '../exception/exception';

@Controller('/api/collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @WrapResult
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.collectionService.create(createCollectionDto, uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  @Get('user')
  @WrapResult
  async findAllUserCollection(
    @Headers('Authorization') uid: string | undefined,
  ) {
    if (uid !== undefined) {
      return await this.collectionService.findAllUserCollection(uid);
    } else {
      throw ServiceResult.userUnauthorized();
    }
  }

  /**
   * 找到 `fid` 对应的收藏数目
   * @param fid
   */
  @Get('forum/num')
  @WrapResult
  async findAllForumCollectionNum(@Query('fid') fid: string | undefined) {
    if (fid !== undefined) {
      return await this.collectionService.findAllForumCollectionNum(fid);
    } else {
      throw ServiceResult.forumDontExists();
    }
  }
}
