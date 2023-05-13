import type {Dayjs} from "dayjs";
import type {UserProfile} from "@/entities/user";
import type {UserProfileDto} from "@/entities/user";
import dayjs from "dayjs";
import {profileToURL} from "@/entities/user";

export interface CommentDto {
  id: string, // 评论的 id
  content: string, // 评论的内容
  time: string, // 评论的时间
  author: UserProfileDto,
  like: {
    id?: string,
    ifLiked?: boolean,
    num: number,
  }
}

export interface CommentData {
  id: string, // 评论的 id
  content: string, // 评论的内容
  time: Dayjs, // 评论的时间
  author: UserProfile,
    like: {
      id?: string,
      ifLiked?: boolean,
      num: number,
  }
}

export function commentDataTransform(commentDto: CommentDto): CommentData {
  const data = {
    ...commentDto
  } as any
  data.time = dayjs(commentDto.time) as any
  data.author.profile = profileToURL(commentDto.author.profile) as any
  return data;
}