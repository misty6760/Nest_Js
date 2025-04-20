// 메시지 관련 스키마 정의
// 채팅방에서 주고받는 메시지의 데이터 구조를 정의합니다.
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ContentType } from "src/common/enums/content.enum";

// Message 문서의 타입 정의
export type MessageDocument = HydratedDocument<Message>;

// 메시지 스키마 정의
@Schema({timestamps: true, versionKey: false})
export class Message {
  // 메시지가 속한 채팅방의 ID
  @Prop({ type: Types.ObjectId, required: true })
  chatRoomId: Types.ObjectId;

  // 메시지 발신자의 ID
  @Prop({ type: Types.ObjectId, required: true }) 
  sender: Types.ObjectId;

  // 메시지 내용의 타입 (텍스트/이미지)
  @Prop({
    required: true,
    type: String,
    enum: ContentType,
    default: ContentType.MESSAGE,
  })
  contentType: ContentType;

  // 메시지의 실제 내용
  @Prop({ required: true })
  content: string;

  // 메시지 생성 시간
  createdAt: Date;
}

// Message 클래스를 바탕으로 Mongoose 스키마 생성
export const MessageSchema = SchemaFactory.createForClass(Message);
