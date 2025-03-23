import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseService } from './database/database.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ConfigService],
})
export class AppModule {}
