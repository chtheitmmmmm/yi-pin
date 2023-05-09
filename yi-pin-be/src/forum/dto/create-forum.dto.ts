import { Length } from 'class-validator';
import type { ForumType } from '../entities/forum.entity';

export class CreateForumDto {
  /**
   * 标题
   */
  @Length(1, 200, {
    message: '标题长度不合法（长度 1 ~ 200）',
  })
  title: string;
  /**
   * 内容
   */
  @Length(1, 10000, {
    message: '内容长度不合法（长度 1 ~ 10000）',
  })
  content: string;
  /**
   * 类型
   */
  type: ForumType;
}
