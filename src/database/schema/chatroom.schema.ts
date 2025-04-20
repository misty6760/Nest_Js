// 채팅방 관련 스키마 정의
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

// ChatRoom 문서의 타입 정의
export type ChatRoomDocument = HydratedDocument<ChatRoom>;

// 암호화된 개인키 정보를 위한 스키마
@Schema({ _id: false })
export class EncryptedPrivateKey {
  // 사용자 ID
  @IsMongoId()
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  // 암호화된 개인키
  @Prop({ required: true })
  encryptedKey: string;
}

// 채팅방 스키마 정의
@Schema({ timestamps: true, versionKey: false })
export class ChatRoom {
  // 채팅방 이름
  @Prop()
  name: string;

  // 채팅방 공개키
  @Prop({ required: true })
  publicKey: string;

  // 참가자들의 암호화된 개인키 목록
  @Prop({ type: [EncryptedPrivateKey] })
  encryptedPrivateKeys: EncryptedPrivateKey[];
}

// ChatRoom 클래스를 바탕으로 Mongoose 스키마 생성
export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
