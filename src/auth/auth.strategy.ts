import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { AccessTokenPayload } from "../common/types/jwt.type";
import { Request } from "express";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(
    Strategy,
    'access_token',
) {
    constructor(configService: ConfigService) {
        const secretKey = configService.config.SECRET_TOKEN;
    
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request): string | null => req?.cookies?.access_token as string,
            ]),
            secretOrKey: secretKey,
            passReqToCallback: false,
        });
    }

    validate(payload: AccessTokenPayload): AccessTokenPayload {
        return payload;
    }
}