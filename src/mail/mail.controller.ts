import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(
    @Body() body: { address: string; mailTitle: string; mailContents: string },
  ) {
    try {
      await this.mailService.sendEmail(
        body.address,
        body.mailTitle,
        body.mailContents,
      );
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send email.' };
    }
  }
}
