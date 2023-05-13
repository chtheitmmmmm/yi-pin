import { IsString } from 'class-validator';

export class CreateCommentLikeDto {
  @IsString({
    message: '评论 id 必须是字符串',
  })
  cid: string; // 被点赞的评论的id
}
