// 앱의 메인 모듈
// 애플리케이션의 전체 구조와 의존성을 정의합니다.
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
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,      // 인증 관련 모듈
    UserModule,      // 사용자 관련 모듈
    ChatModule,      // 채팅 관련 모듈
    ConfigModule,    // 설정 관련 모듈
    DatabaseModule,  // 데이터베이스 관련 모듈
    JwtModule.register({global: true})  // JWT 모듈 (전역으로 설정)
  ],
  controllers: [AppController],  // 앱의 메인 컨트롤러
  providers: [AppService, DatabaseService, ConfigService],  // 앱에서 사용하는 서비스들
})
export class AppModule {}
