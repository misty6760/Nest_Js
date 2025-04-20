// 인증 관련 모듈
// 전역적으로 사용되는 인증 기능을 제공하는 모듈입니다.
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthAccessTokenGuard } from './auth.guard';
import { AuthAccessTokenStrategy } from './auth.strategy';

@Global() // 전역 모듈로 설정하여 어디서든 사용 가능
@Module({
  imports: [], // 외부 모듈 의존성 없음
  controllers: [AuthController], // 인증 관련 요청을 처리하는 컨트롤러
  providers: [AuthService, AuthAccessTokenGuard, AuthAccessTokenStrategy], // 인증 관련 서비스와 가드, 전략 제공
  exports: [AuthService], // AuthService를 다른 모듈에서 사용할 수 있도록 내보냄
})
export class AuthModule {}
