import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {v4} from "uuid";

/**
 * comment
 */
export interface CommentInter {
  /**
   * 评论的作者
   */
  author: string;
  /**
   * 评论针对的论坛 id
   */
  fid: string;
  /**
   * 评论的内容
   */
  content: string;
  /**
   * id
   */
  id: string;
  /**
   * 评论的时间
   */
  time: Date;
}

@Entity()
export class Comment implements CommentInter {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('uuid')
  author: string;

  @Column('uuid')
  fid: string;

  @Column('tinytext')
  content: string;

  @Column('timestamp')
  time: Date = new Date();
}
