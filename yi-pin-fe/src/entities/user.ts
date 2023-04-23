export interface RawUser {
  uid: string
  nickname: string
  account: string
  password: string
  profile: {
    "type": "Buffer",
    "data": Int8Array
  }
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