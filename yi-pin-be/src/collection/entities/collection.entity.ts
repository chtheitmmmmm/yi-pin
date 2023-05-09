import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {v4} from "uuid";

/**
 * collection
 */
export interface CollectionInter {
  /**
   * 被收藏论坛的id
   */
  fid: string;
  /**
   * 收藏的id
   */
  id: string;
  /**
   * 收藏用户的id
   */
  uid: string;
}

@Entity()
export class Collection implements CollectionInter {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('uuid')
  fid: string;

  @Column('uuid')
  uid: string;
}
