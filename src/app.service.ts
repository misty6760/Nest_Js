// 사용자 관리 서비스
// 사용자 정보의 CRUD 작업을 처리합니다.
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // 사용자 데이터를 메모리에 저장하는 배열
  private readonly users =[
    {id: '1', name: 'John Doe', age: 30},
    {id: '2', name: 'Jane Doe', age: 20}
  ];

  // 모든 사용자 정보를 반환합니다.
  getAllUsers() {
    return this.users;
  }

  // 새로운 사용자를 생성합니다.
  createUser(userDto: {name: string; age: number}) {
    const newUser = {
      id: (this.users.length + 1).toString(),
      ...userDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  // 특정 ID의 사용자 정보를 조회합니다.
  getUser(id: string) {
    const user = this.users.find((user) => user, id === id);
    if (!user) {
      return { message: 'User not found'};
    }
    return user;
  }

  // 특정 ID의 사용자 정보를 업데이트합니다.
  updataUser(id: string, userDto: { name: string; age: number}) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if(userIndex === -1) {
      return { message: "User not found"};
    }
    this.users[userIndex] = { id, ...userDto};
    return this.users[userIndex];
  }

  // 특정 ID의 사용자를 삭제합니다.
  deleteUser(id:string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if(userIndex === -1) {
      return { message: "User not found" };
    }
    this.users.splice(userIndex, 1);
    return { message: "User deleted" };
  }
}
