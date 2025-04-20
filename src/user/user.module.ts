// 사용자 관련 모듈
// 사용자 정보 관리를 위한 컨트롤러와 서비스를 정의합니다.
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController], // 사용자 관련 HTTP 요청을 처리하는 컨트롤러
  providers: [UserService] // 사용자 관련 비즈니스 로직을 처리하는 서비스
})
export class UserModule {}
