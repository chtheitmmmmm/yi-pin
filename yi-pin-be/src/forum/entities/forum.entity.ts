import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

type ForumTypeForum = 0;
type ForumTypeConsult = 1;
export type ForumType = ForumTypeForum | ForumTypeConsult;

/**
 * forum
 */
export interface ForumInter {
  /**
   * 作者的uid
   */
  author: string;
  /**
   * 帖子内容
   */
  content: string;
  /**
   * 创建时间
   */
  'create-time': Date;
  /**
   * id
   */
  id: string;
  /**
   * 标题
   */
  title: string;
  /**
   * Forum 的类型，0即为论坛，1即为咨询
   */
  type: ForumType;
}

@Entity()
export class Forum implements ForumInter {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('timestamp')
  'create-time' = new Date();

  @Column('uuid')
  author: string;

  @Column('text')
  content: string;

  @Column('tinytext')
  title: string;

  @Column('tinyint')
  type: ForumType;
}
