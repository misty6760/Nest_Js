// 애플리케이션의 진입점
// NestJS 애플리케이션을 부트스트랩하고 필요한 미들웨어와 파이프를 설정합니다.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // NestJS 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // CORS 허용할 도메인
    credentials: true, // 쿠키 전송 허용
  });
  // 전역 ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // 허용되지 않은 속성이 있으면 요청 거부
      transform: true, // 요청 데이터 자동 형변환
    }),
  );

  // 쿠키 파서 미들웨어 적용
  app.use(cookieParser());

  // 환경변수에서 포트를 가져오거나 기본값 3000 사용
  await app.listen(process.env.PORT ?? 3000);
}

// 애플리케이션 시작
bootstrap();
