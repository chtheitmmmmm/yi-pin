export interface Profile {
  type: 'Buffer',
  data: number[],
}

export interface RawUser {
  uid: string
  nickname: string
  account: string
  password: string
  profile: Profile,
  registerTime: Date 
  type: number 
}

export interface User {
  uid: string
  nickname: string
  account: string
  password: string
  profile: string
  registerTime: Date
  type: number
}

export interface UserProfileDto {
  account: string, // 账号
  profile: Profile // 头像
  nickname: string, // 昵称
}

export interface UserProfile {
  account: string, // 账号
  profile: string // 头像
  nickname: string, // 昵称
}

export function profileToURL(profile: Profile) {
  return URL.createObjectURL(
    new Blob(
      [new Int8Array(profile.data)],
      {
        type: 'image/png'
      }
    )
  )
}