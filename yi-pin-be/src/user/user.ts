import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as fs from 'fs';
import { v1, v4 } from 'uuid';
import * as path from 'path';

export interface UserRegisterInfo {
  account: User['account']
  password: User['password']
}

@Entity()
export class User implements User {
  @PrimaryGeneratedColumn("uuid")
  uid: string = v4()

  @Column("tinytext")
  nickname: string = 'yp-' + v1()

  @PrimaryColumn("varchar", {
    length: 255
  })
  account: string

  @Column("tinytext")
  password: string

  @Column("blob")
  profile: Buffer = fs.readFileSync(path.resolve(__dirname, "../../assets/user-default-profile.png"))

  @Column("timestamp")
  registerTime: Date = new Date()

  @Column("tinyint")
  type: number = 127        // user type

  constructor(userRegisterInfo?: UserRegisterInfo) {
    if (userRegisterInfo !== undefined) {
      this.account = userRegisterInfo.account
      this.password = userRegisterInfo.password
    }
  }
}