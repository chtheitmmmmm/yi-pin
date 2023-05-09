import { IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString({
    message: '帖子ID必须是字符串',
  })
  fid: string;
}
