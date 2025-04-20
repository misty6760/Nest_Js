// 데이터베이스 서비스 클래스
// 데이터베이스 연결 및 모델 관리를 담당합니다.
import { Injectable, Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { Schemas } from './schema';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  // 주어진 스키마에 해당하는 Mongoose 모델을 반환합니다.
  getModel<T>(schema: (typeof Schemas)[keyof typeof Schemas]): Model<T> {
    return this.connection.model<T>(schema.name);
  }

  // 사용자 ID로 문서를 조회하는 메서드
  // 주어진 UID 또는 현재 요청의 사용자 ID를 사용하여 문서를 찾습니다.
  async fisrtOrDefaultWithUid<T>(
    model: Model<T>,
    uid?: string,
  ): Promise<T | null> {
    const userid= uid || (this.request.user as AccessTokenPayload)?.id;
    return model.findById(userid);
  }
}
