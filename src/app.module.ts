import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseService } from './database/database.service';
<<<<<<< HEAD
import { ConfigService } from './config/config.service';
=======
>>>>>>> df6e5240d1590fab0f2dd68369b347fbbaec4d75

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  controllers: [AppController],
<<<<<<< HEAD
  providers: [AppService, DatabaseService, ConfigService],
=======
  providers: [AppService, DatabaseService],
>>>>>>> df6e5240d1590fab0f2dd68369b347fbbaec4d75
})
export class AppModule {}
