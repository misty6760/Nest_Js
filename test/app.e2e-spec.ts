// AppController의 E2E 테스트
// 실제 HTTP 요청을 통해 전체 애플리케이션을 테스트합니다.
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // 각 테스트 전에 테스트 모듈과 애플리케이션을 초기화합니다.
  beforeEach(async () => {
    // 테스트용 NestJS 모듈 생성
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스트용 애플리케이션 인스턴스 생성 및 초기화
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 루트 경로 GET 요청 테스트
  it('/ (GET)', () => {
    return request(app.getHttpServer()) // HTTP 서버에 요청
      .get('/') // GET 메서드로 루트 경로 호출
      .expect(200) // 상태 코드 200 확인
      .expect('Hello World!'); // 응답 본문 확인
  });
});
