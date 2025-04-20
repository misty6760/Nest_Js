// 채팅 관련 모듈
// 채팅 기능에 필요한 컨트롤러, 서비스, 게이트웨이를 정의합니다.
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController], // 채팅 관련 HTTP 요청을 처리하는 컨트롤러
  providers: [ChatService, ChatGateway], // 채팅 비즈니스 로직과 WebSocket 통신을 처리하는 프로바이더
})
export class ChatModule {}
