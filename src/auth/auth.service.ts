import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission } from '../common/enums/permission.enum';
import { ConfigService } from '../config/config.service';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../database/schema/auth.schema';
import { AccessTokenPayload } from '../common/types/jwt.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private confingService: ConfigService,
  ) {}
  //dummyUser 데이터로 DB 연동시 제거 예정
  private readonly users: Auth[] = [
    {
      id: uuidv4(),
      username: 'admin',
      password: '1234',
      nickname: 'God',
      permission: Permission.ADMIN,
    },
    {
      id: uuidv4(),
      username: 'user',
      password: 'password',
      nickname: 'James',
      permission: Permission.USER,
    },
  ];

  //dummyUser에서 유효한 username과 password인지 확인하는 메서드
  public getAccount(id: string, password: string): Auth | undefined {
    const authEntitiy = this.users.find(
      (it) => it.username == id && it.password == password,
    );
    return authEntitiy;
  }
  public inValidCredentials(id: string, password: string): boolean {
    return this.users.some(
      (user) => user['username'] === id && user['password'] === password,
    );
  }

  public async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: 'SECRETSECRETSECRETSECRETSECRETSECRET',
    });
  }
}
