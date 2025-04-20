// 데이터베이스 스키마 모듈
// 애플리케이션에서 사용되는 모든 Mongoose 스키마를 내보냅니다.

import { AuthSchema } from './auth.schema';
import { ChatRoomSchema } from './chatroom.schema';
import { MessageSchema } from './message.schema';

// 스키마 객체를 내보내는 상수
// 각 스키마는 이름과 스키마 정의를 포함합니다.
export const Schemas = {
  Auth: { name: 'Auth', schema: AuthSchema },         // 사용자 인증 관련 스키마
  ChatRoom: { name: 'ChatRoom', schema: ChatRoomSchema }, // 채팅방 관련 스키마
  Message: { name: 'Message', schema: MessageSchema }, // 메시지 관련 스키마
};