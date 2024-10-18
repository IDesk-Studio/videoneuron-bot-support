import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('submit-form')
  async submitForm(
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    if (!email || !message) {
      throw new BadRequestException('All fields of the form must be filled in');
    }

    const formattedMessage = `
      New notification: \n- Email: ${email} \n- Message: ${message}
    `;

    await this.botService.sendMessage(formattedMessage);

    return { message: 'Form successfully submitted!' };
  }
}
