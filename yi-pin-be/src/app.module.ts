import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { CollectionModule } from './collection/collection.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [UserModule, ForumModule, CommentModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
