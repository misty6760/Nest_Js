import { Body, Controller, Delete, Get, Param, Post, Put, UnsupportedMediaTypeException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Post()
  createUser(@Body() userDto: { name: string; age: number }) {
    return this.appService.createUser(userDto);
  }

  @Get(':id')
  getUser(@Param('id') id:string) {
    return this.appService.getUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: { name: string; age: number }) {
    return this.appService.updataUser(id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id:string) {
    return this.appService.deleteUser(id);
  }
}
