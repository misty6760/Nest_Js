import {
    IsNotEmpty,
    IsString,
    Length
} from "class-validator";


export class AuthLoginRequestDto {
    @IsString()
    username: string;

    @IsString()
    @Length(8, 256)
    password: string;
}

export class AuthLoginResposeDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string;

    accessToken: string;
}

export class AuthSignupRequestDto {
    @IsString()
    username: string;

    @IsString()
    @Length(8, 256)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string;
}

export class AuthSignupResponseDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    nickname: string;

    accessToken: string;
}