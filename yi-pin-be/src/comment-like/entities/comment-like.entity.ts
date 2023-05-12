import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column()
  cid: string; // 被点赞的评论的 id

  @Column()
  uid: string; // 给出点赞的用户的 id
}
