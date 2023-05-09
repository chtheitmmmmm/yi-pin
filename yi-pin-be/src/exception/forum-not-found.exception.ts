import { Exception } from './exception';

export class ForumNotFoundException implements Exception {
  statusCode = 404;
  errCode = 2;
  errMsg = '帖子找不到';
}