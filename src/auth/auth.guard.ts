// 액세스 토큰 인증을 위한 가드
// @nestjs/passport의 AuthGuard를 상속받아 'access_token' 전략을 사용
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthAccessTokenGuard extends AuthGuard('access_token') {}