import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as fs from 'fs';
import { v1, v4 } from 'uuid';
import * as path from 'path';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string = v4();

  @Column('tinytext')
  nickname: string = 'yp-' + v1();

  @PrimaryColumn('varchar', {
    length: 255,
  })
  account: string;

  @Column('tinytext')
  password: string;

  @Column('blob')
  profile: Buffer = fs.readFileSync(
    path.resolve(__dirname, '../../../assets/user-default-profile.png'),
  );

  @Column('timestamp')
  registerTime: Date = new Date();

  @Column('tinyint')
  type = 127; // user type
}
