import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString({
    message: '评论内容必须是字符串',
  })
  @Length(1, 200, {
    message: '评论内容长度应为 1 ~ 200',
  })
  content: string;

  @IsString({
    message: '所评论帖子的id必须是字符串',
  })
  fid: string;
}
