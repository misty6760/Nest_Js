// WebSocket 게이트웨이 관련 의존성 모듈
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

// WebSocket 연결을 처리하는 게이트웨이 클래스
@WebSocketGateway()
export class ChatGateway {
  // 'message' 이벤트를 구독하여 메시지를 처리하는 메서드
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    // 테스트용 응답 메시지 반환
    return 'Hello world!';
  }
}
