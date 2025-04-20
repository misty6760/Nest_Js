// 인증 관련 서비스
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { Auth, AuthDocument } from '../database/schema/auth.schema';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { InjectModel } from '@nestjs/mongoose';
import { Schemas } from 'src/database/schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { encryptAES, generateRSAKeyPair } from 'src/common/utils/crypto-helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(Schemas.Auth.name)
    private readonly authModel: Model<Auth>,
  ) {}

  // 계정 조회
  public async getAccount(
    username: string,
    password: string,
  ): Promise<AuthDocument | null> {
    const user = await this.authModel.findOne({ username }).exec();

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  // 계정 생성
  public async createAccount(
    username: string,
    password: string,
    nickname: string,
  ): Promise<AuthDocument | null> {
    const existingUser = await this.authModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('아이디가 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { publicKey, privateKey } = generateRSAKeyPair();
    const encryptedPrivateKey = encryptAES(password, privateKey);
    const newUser = new this.authModel({
      username,
      password: hashedPassword,
      nickname,
      publicKey,
      encryptedPrivateKey,
    });

    await newUser.save();
    return newUser;
  }

  // 토큰 생성
  public async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.config.SECRET_TOKEN,
    });
  }

  // 토큰 검증
  public tryVerifyAccessToken(token: string): AccessTokenPayload | null {
    try {
      const payload = this.jwtService.verify<AccessTokenPayload>(token, {
        secret: this.configService.config.SECRET_TOKEN,
        ignoreExpiration: false,
      });
      return payload;
    } catch {
      return null;
    }
  }

  // 인증 정보 조회
  public async getAuthInfo(id: Types.ObjectId) {
    return await this.authModel.findById(id).exec();
  }

  // 다중 인증 정보 조회
  public async getAuthInfos(ids: Types.ObjectId[]) {
    return await this.authModel.find({ _id: { $in: ids } }).exec();
  }
}
