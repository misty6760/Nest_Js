// 환경 설정 서비스
// 애플리케이션의 환경 설정 값들을 관리하는 서비스입니다.
import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    // 환경 설정 값을 담는 객체
    config: Configuration;

    constructor(private configService: NestConfigService) {
        // 환경 변수에서 설정 값을 가져와 기본값과 함께 설정
        this.config = {
            // MongoDB 연결 URI (기본값: localhost)
            DB_URI: configService.get('DB_URI') || 'localhost',
            // 서버 포트 (기본값: 3000)
            PORT: parseInt(configService.get('PORT') || '3000'),
            // JWT 토큰 암호화 키 (기본값: sercetsercetsercet)
            SECRET_TOKEN: configService.get('SECRET_TOKEN') || 'sercetsercetsercet',
        } as Configuration
    }
}
