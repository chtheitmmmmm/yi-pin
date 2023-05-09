import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers, Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';

@Controller('/api/collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @Headers('Authorization') uid: string,
  ) {
    if (uid) {
      return await this.collectionService.create(createCollectionDto, uid);
    } else {
      throw new UserUnauthorizedException();
    }
  }

  @Get('user')
  async findAllUserCollection(@Headers('Authorization') uid: string) {
    if (uid) {
      return await this.collectionService.findAllUserCollection(uid);
    } else {
      return new UserUnauthorizedException();
    }
  }

  @Get('forum/num')
  async findAllForumCollectionNum(@Query('fid') fid: string) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
