import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthAccessTokenGuard } from './auth.guard';
import { AuthAccessTokenStrategy } from './auth.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthAccessTokenGuard, AuthAccessTokenStrategy],
})
export class AuthModule {}
