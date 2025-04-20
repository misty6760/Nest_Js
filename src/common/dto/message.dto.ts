// 메시지 관련 DTO (Data Transfer Object) 정의
// 이 파일은 메시지의 기본 정보를 전송하기 위한 데이터 구조를 정의합니다.

import { Expose } from "class-transformer";
import { IsEnum, IsMongoId, IsString, IsDate } from "class-validator";
import { Types } from "mongoose";
import { MessageDocument } from "../../database/schema/message.schema";
import { ContentType } from "../enums/content.enum";

// 메시지 정보를 담는 DTO 클래스
export class MessageDto {
  // MessageDocument로부터 DTO 객체를 생성하는 생성자
  constructor(messageDocument: MessageDocument) {
    this.sender = messageDocument.sender;
    this.contentType = messageDocument.contentType;
    this.content = messageDocument.content;
    this.createdAt = messageDocument.createdAt;
  }

  // 메시지 발신자의 고유 식별자
  @Expose()
  @IsMongoId()
  sender: Types.ObjectId;

  // 메시지 내용의 타입 (예: 텍스트, 이미지 등)
  @Expose()
  @IsEnum(ContentType)
  contentType: ContentType;

  // 메시지의 실제 내용
  @Expose()
  @IsString()
  content: string;
  
  // 메시지 생성 시간
  @Expose()
  @IsDate()
  createdAt: Date;
}