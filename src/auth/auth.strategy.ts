// 액세스 토큰 인증 전략을 정의하는 클래스입니다.
// Passport.js의 JWT 전략을 사용하여 액세스 토큰을 검증합니다.

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { Request } from 'express';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(
    Strategy,
    'access_token',
) {
    constructor(configService: ConfigService) {
        // 환경 설정에서 비밀 키를 가져옵니다.
        const secretKey = configService.config.SECRET_TOKEN;

        super({
            // 요청의 쿠키에서 액세스 토큰을 추출하는 함수를 정의합니다.
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request): string | null => req?.cookies?.access_token as string,
            ]),
            secretOrKey: secretKey, // JWT 검증에 사용할 비밀 키를 설정합니다.
            passReqToCallback: false, // 요청 객체를 콜백에 전달하지 않도록 설정합니다.
        });
    }

    // JWT 페이로드를 검증하고 반환하는 메서드입니다.
    validate(payload: AccessTokenPayload): AccessTokenPayload {
        return payload; // 유효한 페이로드를 그대로 반환합니다.
    }
}
