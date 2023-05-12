export interface CommentData {
  id: string,
  author: {
    account: string,
    nickname: string,
    profile: string
  },
  content: string,
}