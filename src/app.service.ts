import { Injectable } from '@nestjs/common';
import { use } from 'passport';

@Injectable()
export class AppService {
  private readonly users =[
    {id: '1', name: 'John Doe', age: 30},
    {id: '2', name: 'Jane Doe', age: 20},
  ];

  getAllUsers() {
    return this.users;
  }

  createUser(userDto: {name: string; age: number}) {
    const newUser = {
      id: (this.users.length + 1).toString(),
      ...userDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUser(id: string) {
    const user = this.users.find((user) => user, id === id);
    if (!user) {
      return { message: 'User not found'};
    }
    return user;
  }

  updataUser(id: string, userDto: { name: string; age: number}) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if(userIndex === -1) {
      return { message: "User not found"};
    }
    this.users[userIndex] = { id, ...userDto};
    return this.users[userIndex];
  }

  deleteUser(id:string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if(userIndex === -1) {
      return { message: "User not found" };
    }
    this.users.splice(userIndex, 1);
    return { message: "User deleted" };
  }
}
