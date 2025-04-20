// 채팅 관련 DTO (Data Transfer Object) 정의
// 이 파일은 채팅방 생성, 메시지 전송 등에 필요한 데이터 구조를 정의합니다.

import { 
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsString,
} from "class-validator";
import { ChatRoomDto } from "src/common/dto/chatroom.dto";
import { MessageDto } from "src/common/dto/message.dto";
import { Types } from "mongoose";
import { UserInfoDto } from "src/common/dto/userinfo.dto";
import { ContentType } from "src/common/enums/content.enum";

// 채팅방 목록 응답 DTO
export class ChatRoomsResponseDto {
  chatrooms: ChatRoomDto[];
}

// 채팅방 생성 요청 DTO
export class ChatRoomCreateRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  participantid: Types.ObjectId[]; // 참가자 ID 배열
}

// 채팅방 생성 응답 DTO
export class ChatRoomCreateResponseDto {
  @IsMongoId()
  id: Types.ObjectId; // 채팅방 ID

  @IsString()
  name: string; // 채팅방 이름

  @IsString()
  publicKey: string; // 공개키

  @IsString()
  encryptedPrivateKey: string; // 암호화된 개인키
}

// 채팅방 정보 응답 DTO
export class ChatRoomInfoResponseDto {
  @IsMongoId()
  roomid: Types.ObjectId; // 채팅방 ID

  participants: UserInfoDto[]; // 참가자 정보 배열

  messages: MessageDto[]; // 메시지 배열
}

// 채팅방 메시지 전송 요청 DTO
export class ChatRoomSendMessageRequestDto {
  @IsString()
  content: string; // 메시지 내용

  @IsEnum(ContentType)
  contentType: ContentType; // 메시지 타입
}