import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerService } from './controller/controller.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, ControllerService],
  controllers: [AuthController]
})
export class AuthModule {}
