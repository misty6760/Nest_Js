// 환경 설정 관련 모듈
// 애플리케이션의 환경 설정을 관리하는 모듈입니다.
import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule, // NestJS 기본 제공 ConfigModule
  ConfigService as NestConfigService, // NestJS 기본 제공 ConfigService
} from '@nestjs/config';
import { ConfigService } from './config.service';

@Global() // 전역 모듈로 설정하여 어디서든 사용 가능
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // 전역 설정으로 사용
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`, // 환경에 따른 .env 파일 로드
    }),
  ],
  providers: [
    {
      provide: ConfigService, // ConfigService 프로바이더 설정
      useFactory: (nestConfigService: NestConfigService) => // 팩토리 함수를 통한 ConfigService 인스턴스 생성
        new ConfigService(nestConfigService),
      inject: [NestConfigService], // NestConfigService 주입
    },
  ],
  exports: [ConfigService], // ConfigService를 다른 모듈에서 사용할 수 있도록 내보냄
})
export class ConfigModule {}
