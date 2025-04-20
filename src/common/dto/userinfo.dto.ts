// 사용자 정보 관련 DTO (Data Transfer Object) 정의
// 사용자의 기본 정보를 전송하기 위한 데이터 구조를 정의합니다.

import { Expose } from "class-transformer";
import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";
import { AuthDocument } from "src/database/schema/auth.schema";

// 사용자 정보를 담는 DTO 클래스
export class UserInfoDto {
  // AuthDocument로부터 DTO 객체를 생성하는 생성자
  constructor(authDocument: AuthDocument) {
    this.id = authDocument.id;
    this.nickname = authDocument.nickname;
  }

  // 사용자의 고유 식별자
  @Expose()
  @IsMongoId()
  id: Types.ObjectId;

  // 사용자의 닉네임
  @Expose()
  @IsString()
  nickname: string;
}