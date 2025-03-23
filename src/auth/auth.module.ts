import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerService } from './controller/controller.service';

@Module({
  providers: [AuthService, ControllerService]
})
export class AuthModule {}
