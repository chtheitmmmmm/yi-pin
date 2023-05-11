import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {v4} from "uuid";

export interface LikeInter {
  /**
   * like 自身的id
   */
  id: string;
  /**
   * 发起点赞的用户的 id
   */
  uid: string;
  /**
   * 被点赞的帖子的 id
   */
  fid: string;
}

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('uuid')
  uid: string;

  @Column('uuid')
  fid: string;
}
