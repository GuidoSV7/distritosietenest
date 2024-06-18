import { Injectable } from '@nestjs/common';
import { CreateMessageTelegramDto } from './dto/createmessage-telegram.dto';
import { TelegramSendMessageParams, TelegramService as telegramservicebot } from 'nestjs-telegram';

@Injectable()
export class TelegramService {

  constructor(private telegram: telegramservicebot) { }

  sendMessage(createMessageTelegramDto: CreateMessageTelegramDto) {
    const params: TelegramSendMessageParams = {
      chat_id: createMessageTelegramDto.chatId,
      text: createMessageTelegramDto.mensaje
    };

    this.telegram.sendMessage(params).subscribe((result) => {
        if (result) {
            console.log("Mensaje enviado correctamente");
        } else {
            console.log("No se envio el mensaje");
        }
    }, (error) => {
        console.error("Error: ", error);
    })
}

}
