// 사용자 관련 컨트롤러
// 사용자 정보 관리를 위한 엔드포인트들을 정의합니다.
import { Body, Controller, Delete, Get, Param, Post, Put, UnsupportedMediaTypeException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 모든 사용자 정보를 조회합니다.
  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  // 새로운 사용자를 생성합니다.
  @Post()
  createUser(@Body() userDto: { name: string; age: number }) {
    return this.appService.createUser(userDto);
  }

  // 특정 ID의 사용자 정보를 조회합니다.
  @Get(':id')
  getUser(@Param('id') id:string) {
    return this.appService.getUser(id);
  }

  // 특정 ID의 사용자 정보를 업데이트합니다.
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: { name: string; age: number }) {
    return this.appService.updataUser(id, userDto);
  }

  // 특정 ID의 사용자를 삭제합니다.
  @Delete(':id')
  deleteUser(@Param('id') id:string) {
    return this.appService.deleteUser(id);
  }
}
