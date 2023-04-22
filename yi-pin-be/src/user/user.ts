import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import * as fs from 'fs';
import uuid from 'uuid';

export interface UserRegisterInfo {
  account: User['account']
  password: User['password']
}

@Entity()
export class User {
  @PrimaryColumn("varchar", {
    length: 36
  })
  uid: string = uuid.v4()

  @Column("tinytext")
  nickname: string

  @PrimaryColumn("varchar", {
    length: 255
  })
  account: string

  @Column("tinytext")
  password: string

  @Column("blob")
  profile: Blob = new Blob([fs.readFileSync("assets/user-default-profile.png").buffer])

  @Column("timestamp")
  registerTime: Date = new Date()

  @Column("tinyint")
  type: number        // user type

  constructor({account, password}: UserRegisterInfo) {
    this.account = account
    this.password = password
  }
}