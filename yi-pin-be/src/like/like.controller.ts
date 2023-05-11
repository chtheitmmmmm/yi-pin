import { Controller, Post, Body, Headers } from '@nestjs/common';
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
}
