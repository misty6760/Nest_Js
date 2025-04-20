// 인증 관련 DTO (Data Transfer Object) 정의
// 이 파일은 로그인과 회원가입에 필요한 데이터 구조를 정의합니다.

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

// 로그인 요청 DTO
// 사용자가 로그인할 때 제공해야 하는 정보를 정의합니다.
export class AuthLoginRequestDto {
    @IsString()
    username: string; // 사용자 이름

    @IsString()
    @Length(8, 256)
    password: string; // 비밀번호 (8자 이상 256자 이하)
}

// 로그인 응답 DTO
// 로그인 성공 시 서버가 클라이언트에게 반환하는 정보를 정의합니다.
export class AuthLoginResponseDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string; // 사용자 닉네임 (3자 이상 20자 이하)

    accessToken: string; // 인증 토큰

    @IsMongoId()
    id: Types.ObjectId; // 사용자 고유 ID (MongoDB ObjectId)

    @IsNotEmpty()
    @IsString()
    publicKey: string; // 사용자의 공개키

    @IsNotEmpty()
    @IsString()
    encryptedPrivateKey: string; // 암호화된 개인키
}

// 회원가입 요청 DTO
// 새 사용자가 회원가입할 때 제공해야 하는 정보를 정의합니다.
export class AuthSignupRequestDto {
    @IsString()
    username: string; // 사용자 이름

    @IsString()
    @Length(8, 256)
    password: string; // 비밀번호 (8자 이상 256자 이하)

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string; // 사용자 닉네임 (3자 이상 20자 이하)
}

// 회원가입 응답 DTO
// 회원가입 성공 시 서버가 클라이언트에게 반환하는 정보를 정의합니다.
export class AuthSignupResponseDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string; // 사용자 닉네임
    
    accessToken: string; // 인증 토큰

    @IsNotEmpty()
    @IsString()
    encryptedPublicKey: string; // 암호화된 공개키

    @IsNotEmpty()
    @IsString()
    publicKey: string; // 공개키
}
