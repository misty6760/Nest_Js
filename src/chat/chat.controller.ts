import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ChatRoomInfoResponseDto,
  ChatRoomsResponseDto,
  ChatRoomCreateRequestDto,
  ChatRoomCreateResponseDto,
} from './chat.dto';
import { ChatService } from './chat.service';
import { AuthAccessTokenGuard } from '../auth/auth.guard';
import { AuthInfo } from '../auth/auth.decorator';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { Types } from 'mongoose';
import { ChatRoomDto } from '../common/dto/chatroom.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserInfoDto } from 'src/common/dto/userinfo.dto';

// 채팅 관련 컨트롤러
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  // 사용자의 채팅방 목록을 조회하는 엔드포인트
  @UseGuards(AuthAccessTokenGuard)
  @Get('chat/rooms')
  async chatRooms(
    @AuthInfo() { id }: AccessTokenPayload,
  ): Promise<ChatRoomsResponseDto> {
    const chatrooms = await this.chatService.getChatRooms(
      new Types.ObjectId(id),
    );
    return { chatrooms: chatrooms.map((it) => new ChatRoomDto(it)) };
  }

  // 특정 채팅방의 정보를 조회하는 엔드포인트
  @UseGuards(AuthAccessTokenGuard)
  @Get('chat/rooms/:roomId')
  async chatRoomInfo(
    @Param('roomId') roomIdStr: string,
  ): Promise<ChatRoomInfoResponseDto> {
    const roomId = new Types.ObjectId(roomIdStr);
    const roomInfo = await this.chatService.getChatRoom(roomId);
    if (!roomInfo) {
      throw new NotFoundException('해당 채팅방의 대한 정보가 없습니다.');
    }
    const participants = await this.authService.getAuthInfos(
      roomInfo.encryptedPrivateKeys.map((it) => it.userId),
    );
    if (!participants) {
      throw new NotFoundException('채팅방 사용자의 대한 정보가 없습니다.');
    }
    const messages = await this.chatService.getMessages(roomId);
    return {
      roomid: roomId,
      messages: messages.map((it) => new MessageDto(it)),
      participants: participants.map((it) => new UserInfoDto(it)),
    };
  }

  // 새로운 채팅방을 생성하는 엔드포인트
  @UseGuards(AuthAccessTokenGuard)
  @Post('chat/rooms')
  async chatRoomCreate(
    @Body() { participantid }: ChatRoomCreateRequestDto,
    @AuthInfo() authInfo: AccessTokenPayload,
  ): Promise<ChatRoomCreateResponseDto> {
    // 참가자들의 계정 정보를 조회
    const users = await this.chatService.getAccounts(participantid);
    if (participantid.length != users.length) {
      throw new NotFoundException('일부 유저들을 찾을 수 없습니다.');
    }

    // 채팅방 생성 및 응답 데이터 구성
    const { id, name, publicKey, encryptedPrivateKeys } =
      await this.chatService.createChatRoom(users);
    return {
      id,
      name,
      publicKey,
      encryptedPrivateKey: encryptedPrivateKeys.find(
        (it) => it.userId.toString() === authInfo.id,
      )!.encryptedKey,
    };
  }
}
