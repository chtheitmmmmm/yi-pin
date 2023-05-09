import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from './db/db.service';

/**
 * 通过 id 判断实体存在性，如果存在就返回 id
 */
@Injectable()
export class UserIdExistsPipe implements PipeTransform<any> {
  constructor(private readonly dbService: DbService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    if (await this.dbService.hasUser(value)) {
      throw new NotFoundException({
        errCode: 1,
        errMsg: '用户不存在',
      });
    }
  }
}

/**
 * 通过 id 判断注释是否存在
 */
@Injectable()
export class ForumIdExistsPipe implements PipeTransform<any> {
  constructor(private readonly dbService: DbService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    if (await this.dbService.hasForum(value)) {
      throw new NotFoundException({
        errCode: 2,
        errMsg: '对应帖子不存在',
      });
    }
  }
}
