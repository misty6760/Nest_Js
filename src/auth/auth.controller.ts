// 인증 관련 컨트롤러
import { Body, Controller, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto, AuthLoginResponseDto, AuthSignupRequestDto, AuthSignupResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 로그인 처리
    @Post('login')
    async authLogin(
        @Body() authLoginDto: AuthLoginRequestDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthLoginResponseDto> {
        // 사용자 이름과 비밀번호 추출
        const { username, password } = authLoginDto;

        // 계정 정보 확인
        const authEntity = await this.authService.getAccount(username, password);
        if(!authEntity) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
        }
        // 필요한 정보 추출
        const { nickname, publicKey, encryptedPrivateKey } = authEntity;

        // 액세스 토큰 생성
        const accessToken = await this.authService.createAccessToken({
            id: authEntity.id,
            nickname: authEntity.nickname,
        });

        // 쿠키에 액세스 토큰 설정
        res.cookie('access_token', accessToken, {
            // httpOnly: true,
            // secure: true,
            // sameSite: 'strict',
        });

        // 응답 데이터 반환
        return {
            accessToken,
            nickname,
            publicKey,
            encryptedPrivateKey,
            id: authEntity.id,
        };
    }

    // 회원가입 처리
    @Post('signup')
    async authSignup(
        @Body() authSignupDto: AuthSignupRequestDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthSignupResponseDto> {
        // 사용자 입력 데이터 추출
        const { username, password, nickname } = authSignupDto;

        // 기존 사용자 확인
        const existingUser = await this.authService.getAccount(username, password);
        if (existingUser !== null) {
            throw new UnauthorizedException('이미 존재하는 아이디입니다.');
        }

        // 새 계정 생성
        const newUser = await this.authService.createAccount(
            username, password, nickname
        );
        if(!newUser) {
            throw new UnauthorizedException('회원가입에 실패했습니다.');
        }

        // 액세스 토큰 생성
        const accessToken = await this.authService.createAccessToken({
            id: newUser.id,
            nickname: newUser.nickname,
        });

        // 쿠키에 액세스 토큰 설정
        res.cookie('access_token', accessToken, {
            // httpOnly: true,
            // secure: true,
            // sameSite: 'strict',
        });

        // 응답 데이터 반환
        return {
            accessToken,
            nickname,
            publicKey: newUser.publicKey,
            encryptedPublicKey: newUser.encryptedPrivateKey,
        };
    }
}
