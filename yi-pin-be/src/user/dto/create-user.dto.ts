import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: '账号必须是字符串',
  })
  @Matches(/^\d{3,10}$/, {
    message: '账号不符合长度在3~10之间切全部为数字的要求。',
  })
  account: string;

  @IsString({
    message: '密码必须是字符串',
  })
  @Matches(/^[a-zA-Z0-9\-_]{5,255}$/, {
    message:
      '密码不符合长度在5~255之间且只能出现字母、数字、中划线（-）、下划线（_）的要求。',
  })
  password: string;
}
