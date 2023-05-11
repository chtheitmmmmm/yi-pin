import { IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString({
    message: '帖子ID必须是字符串',
  })
  fid: string;
}
