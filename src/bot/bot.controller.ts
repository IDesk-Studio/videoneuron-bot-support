import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('submit-form')
  async submitForm(
    @Body('userId') userId: string,
    @Body('email') email: string,
    @Body('projectId') projectId: string,
    @Body('errorMessage') errorMessage: string | null,
    @Body('message') message: string,
  ) {
    if (!userId || !email || !projectId || !message) {
      throw new BadRequestException('All fields of the form must be filled in');
    }

    const errorPart = errorMessage ? `\`\`\`${errorMessage}\`\`\`` : 'отсутствует 😱';

    const formattedMessage = 
      `⚠️ Уведомление об ошибке:\n` +
      `- Id пользователя: ${userId}\n` +
      `- Почта пользователя: ${email}\n` +
      `- Id проекта: ${projectId}\n` +
      `- Сообщение от пользователя: ${message}\n` +
      `- Сообщение об ошибке: ${errorPart}`;

    await this.botService.sendMessage(formattedMessage);

    return { message: 'Form successfully submitted!' };
  }
}
