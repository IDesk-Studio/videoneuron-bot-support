import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(msg.chat.id, 'The bot has been successfully launched!');
    });
  }

  async sendMessage(message: string): Promise<void> {
    await this.bot.sendMessage(this.chatId, message);
  }
}
