// 채팅방 관련 DTO (Data Transfer Object) 정의
// 채팅방의 기본 정보를 전송하기 위한 데이터 구조를 정의합니다.

import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";
import { ChatRoomDocument } from "../../database/schema/chatroom.schema";
import { Expose } from "class-transformer";

// 채팅방 정보를 담는 DTO 클래스
export class ChatRoomDto {
  // ChatRoomDocument로부터 DTO 객체를 생성하는 생성자
  constructor(chatroomDocument: ChatRoomDocument) {
    this.id = chatroomDocument.id;
    this.name = chatroomDocument.name;
  }

  // 채팅방의 고유 식별자
  @Expose()
  @IsMongoId()
  id: Types.ObjectId;
  
  // 채팅방의 이름
  @Expose()
  @IsString()
  name: string;
}
