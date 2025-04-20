// 채팅 관련 서비스를 제공하는 클래스입니다.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Schemas } from 'src/database/schema';
import { Auth, AuthDocument } from 'src/database/schema/auth.schema';
import {
  ChatRoom,
  ChatRoomDocument,
  EncryptedPrivateKey,
} from 'src/database/schema/chatroom.schema';
import {
  generateRSAKeyPair,
  hybridEncrypt,
} from '../common/utils/crypto-helper';
import { Message } from 'src/database/schema/message.schema';
import { ContentType } from 'src/common/enums/content.enum';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Schemas.ChatRoom.name)
    private readonly chatroomModel: Model<ChatRoom>,
    @InjectModel(Schemas.Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(Schemas.Message.name)
    private readonly messageModel: Model<Message>,
  ) {}

  // 주어진 ID 배열에 해당하는 계정 정보를 조회합니다.
  public async getAccounts(ids: Types.ObjectId[]) {
    return await this.authModel.find({ _id: { $in: ids } }).exec();
  }

  // 특정 채팅방의 메시지를 조회합니다.
  public async getMessages(id: Types.ObjectId) {
    return await this.messageModel
      .find({ chatRoomId: id })
      .sort({ _id: 1 })
      .exec();
  }

  // 사용자가 참여한 채팅방 목록을 조회합니다.
  public async getChatRooms(id: Types.ObjectId) {
    return await this.chatroomModel
      .find({
        encryptedPrivateKeys: {
          $elemMatch: {
            userId: id.toString(),
          },
        },
      })
      .exec();
  }

  // 특정 채팅방 정보를 조회합니다.
  public async getChatRoom(roomId: Types.ObjectId) {
    return await this.chatroomModel.findById(roomId).exec();
  }

  // 새로운 채팅방을 생성합니다.
  public async createChatRoom(
    users: AuthDocument[],
  ): Promise<ChatRoomDocument> {
    const { publicKey, privateKey } = generateRSAKeyPair();

    const encryptedPrivateKeys = users.map(
      (user): EncryptedPrivateKey => ({
        userId: user.id as Types.ObjectId,
        encryptedKey: hybridEncrypt(user.publicKey, privateKey.toString()),
      }),
    );

    const chatroom = new this.chatroomModel({
      name: users.map((it) => it.nickname).join(', '),
      publicKey,
      encryptedPrivateKeys,
    });

    await chatroom.save();
    return chatroom;
  }

  // 새로운 메시지를 생성합니다.
  public async createMessage(
    id: Types.ObjectId,
    chatRoomId: Types.ObjectId,
    content: string,
    contentType: ContentType = ContentType.MESSAGE,
  ) {
    return await this.messageModel.insertOne({
      chatRoomId,
      content,
      sender: id,
      contentType,
    });
  }
}
