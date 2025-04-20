// 인증 데코레이터에 필요한 의존성 모듈
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { Request } from 'express';

export const AuthInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessTokenPayload => {
    // HTTP 요청 객체 가져오기
    const request = ctx.switchToHttp().getRequest<Request>();
    // 요청에서 사용자 정보 추출하여 반환
    return request.user as AccessTokenPayload;
  },
);
