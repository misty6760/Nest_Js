import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseService } from './database/database.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, UserModule, ChatModule, ConfigModule, JwtModule.register({global: true})],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ConfigService],
})
export class AppModule {}
