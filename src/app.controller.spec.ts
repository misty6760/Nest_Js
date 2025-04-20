// AppController에 대한 테스트 파일
// AppController의 기능을 테스트하기 위한 스펙을 정의합니다.
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // 각 테스트 전에 실행되는 설정
  beforeEach(async () => {
    // 테스트 모듈 생성
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // AppController 컨트롤러 등록
      providers: [AppService], // AppService 프로바이더 등록
    }).compile();

    // 테스트할 컨트롤러 인스턴스 가져오기
    appController = app.get<AppController>(AppController);
  });
});