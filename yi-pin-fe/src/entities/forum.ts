import type {Dayjs} from "dayjs";
import type {Profile, UserProfile, UserProfileDto} from "@/entities/user";
import {profileToURL} from "@/entities/user";
import dayjs from "dayjs";
import {marked} from "marked";

export interface ForumLike {
  id?: string,
  ifLiked?: boolean,
  num: number,
}

export interface ForumCollection {
    id?: string,
    ifCollected?: boolean,
    num: number,
  }

// Get /api/forum 响应体
export interface ForumProfileDto {
  id: string,
  title: string,
  createTime: string,
  like: ForumLike,
  collection: ForumCollection,
  commentNum: number,
}

export interface ForumProfile {
  id: string,
  title: string,
  createTime: Dayjs,
  like: ForumLike,
  collection: ForumCollection,
  commentNum: number,
}

// Get /api/forum/:id 响应体
export interface ForumDetailDto {
  id: string, // 帖子的 id
  content: string // 帖子的 内容
  title: string, // 帖子的 标题
  createTime: string, // 发布时间
  type: 0 | 1, // 类型
  author: { // 作者
    uid: string, // 作者 id
    nickname: string, // 作者昵称
    account: string, // 作者账号
    profile: Profile, // 作者头像
    type: number, // 作者用户类型
  },
  like: ForumLike,
  collection: ForumCollection,
  comments: {
    id: string, // 评论的 id
    content: string, // 评论的内容
    time: string, // 评论的时间
    author: UserProfileDto,
    like: {
      id?: string,
      ifLiked?: boolean,
      num: number,
    }
  }[],
}

export interface ForumDetail {
  id: string, // 帖子的 id
  content: string // 帖子的 内容
  title: string, // 帖子的 标题
  createTime: Dayjs, // 发布时间
  type: 0 | 1, // 类型
  author: { // 作者
    uid: string, // 作者 id
    nickname: string, // 作者昵称
    account: string, // 作者账号
    profile: string, // 作者头像
    type: number, // 作者用户类型
  },
  like: ForumLike,
  collection: ForumCollection,
  comments: {
    id: string, // 评论的 id
    content: string, // 评论的内容
    time: Dayjs, // 评论的时间
    author: UserProfile,
    like: {
      id?: string,
      ifLiked?: boolean,
      num: number,
    }
  }[],
}

export function forumDetailTransform(dto: ForumDetailDto): ForumDetail {
  const detail: any = {
    ...dto
  } as any
  detail.createTime = dayjs(dto.createTime) as any
  detail.author.profile = profileToURL(dto.author.profile) as any
  detail.comments.forEach((c: any) => {
    c.time = dayjs(c.time) as any
    c.author.profile = profileToURL(c.author.profile) as any
  })
  detail.content = marked.parse(dto.content)
  return detail
}
