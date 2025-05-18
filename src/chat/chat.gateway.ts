import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatRoomSendMessageRequestDto } from './chat.dto';
import { Types } from 'mongoose';
import { MessageDto } from 'src/common/dto/message.dto';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*', // 모든 도메인에서의 요청 허용
    credentials: true, // 쿠키를 허용하려면 반드시 true로 설정
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // WebSocket 서버 인스턴스

  constructor(
    private readonly chatService: ChatService, // 채팅 관련 서비스
    private readonly authService: AuthService, // 인증 관련 서비스
  ) {}

  async handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie; // 클라이언트의 쿠키 가져오기

    if (!cookies) {
      console.log(`[Client:${client.id}] 쿠키가 없어서 연결 종료`);
      return client.disconnect(); // 쿠키가 없으면 연결 종료
    }

    // 쿠키에서 access_token 추출
    const token = cookies
      .split(';')
      .map((c) => c.trim())
      .map((c) => c.split('=')) // [key, value] 형태로 분리
      .find(([key]) => key === 'access_token')?.[1];

    if (!token) {
      console.log(`[Client:${client.id}] 유효한 access_token이 없어서 연결 종료`);
      return client.disconnect(); // 토큰이 없으면 연결 종료
    }

    const payload = this.authService.tryVerifyAccessToken(token); // 토큰 검증
    if (!payload) {
      console.log(`[Client:${client.id}] access_token 검증 실패로 연결 종료`);
      return client.disconnect(); // 검증 실패 시 연결 종료
    }

    client.data = payload; // 클라이언트 데이터에 payload 저장

    const { room } = client.handshake.query; // 클라이언트가 요청한 방 정보 가져오기

    if (typeof room === 'string') {
      await client.join(room); // 방에 클라이언트 추가
      console.log(
        `[Client:${client.id}] [Nickname:${payload.nickname}] 방에 참여함: ${room}`,
      );
    } else {
      console.warn(
        `[Client:${client.id}] [Nickname:${payload.nickname}] 유효한 방 정보를 제공하지 않음`,
      );
      return client.disconnect(); // 방 정보가 없으면 연결 종료
    }
  }

  handleDisconnect(client: Socket) {
    const payload = client.data as AccessTokenPayload; // 클라이언트 데이터에서 payload 가져오기
    console.log(
      `[Client:${client.id}] [Nickname:${payload.nickname}] 연결 종료됨`,
    );
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() { content, contentType }: ChatRoomSendMessageRequestDto, // 메시지 내용 및 타입
    @ConnectedSocket() client: Socket, // 메시지를 보낸 클라이언트
  ): Promise<void> {
    const { room } = client.handshake.query; // 클라이언트가 속한 방 정보
    const payload = client.data as AccessTokenPayload; // 클라이언트 데이터에서 payload 가져오기
    console.log(
      `[Client:${client.id}] [Nickname:${payload.nickname}] 메시지 수신: ${content}`,
    );

    const token = client.data as AccessTokenPayload; // 클라이언트 토큰 정보
    await this.chatService.createMessage(
      new Types.ObjectId(token.id), // 메시지 보낸 사람 ID
      new Types.ObjectId(room as string), // 방 ID
      content, // 메시지 내용
      contentType, // 메시지 타입
    );

    // 같은 방에 있는 다른 클라이언트들에게 메시지 전송 (보낸 사람 제외)
    client.to(room as string).emit('message', {
      sender: new Types.ObjectId(token.id), // 보낸 사람 ID
      content: content, // 메시지 내용
      contentType: contentType, // 메시지 타입
    } as unknown as MessageDto);
  }
}
