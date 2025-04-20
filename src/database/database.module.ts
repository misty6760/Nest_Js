// 데이터베이스 모듈
// 애플리케이션의 데이터베이스 연결 및 스키마 설정을 관리합니다.

import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { DatabaseService } from "./database.service";
import { Schemas } from "./schema";

// 전역 모듈로 설정하여 어디서든 사용 가능
@Global()
@Module({
    imports: [
      ConfigModule, // 환경 설정 모듈 임포트
      // MongoDB 연결 설정
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.config.DB_URI, // 환경 설정에서 DB URI 가져오기
        }),
      }),
      // 스키마 등록
      MongooseModule.forFeature(
        Object.values(Schemas).map(({ name, schema }) => ({ name, schema })),
      ),
    ],
    providers: [DatabaseService], // 데이터베이스 서비스 제공
    exports: [DatabaseService, MongooseModule], // 다른 모듈에서 사용할 수 있도록 내보내기
})

export class DatabaseModule {}