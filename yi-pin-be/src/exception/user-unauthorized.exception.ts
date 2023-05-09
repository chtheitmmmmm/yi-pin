import { Exception } from './exception';

export class UserUnauthorizedException implements Exception {
  statusCode = 401;
  errCode = 1;
  errMsg = '用户无权限';
}
