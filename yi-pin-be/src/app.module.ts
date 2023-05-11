import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { CollectionModule } from './collection/collection.module';
import { ForumModule } from './forum/forum.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    UserModule,
    ForumModule,
    CommentModule,
    CollectionModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
