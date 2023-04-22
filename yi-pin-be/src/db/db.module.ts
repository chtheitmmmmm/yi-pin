import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

// 数据库模块是全局模块
@Global()
@Module({
  providers: [DbService]
})
export class DbModule {

}
