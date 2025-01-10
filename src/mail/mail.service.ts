import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(address: string, mailTitle: string, mailContents: string) {
    await this.mailerService.sendMail({
      to: address,
      // from: this.configService.get<string>('GMAIL_SMTP_USER'),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>버튼 예제</title>
      </head>
      <body>
      
        <button type="button">${mailContents}</button>
      
      </body>
      </html>
  `, // HTML 콘텐츠
      subject: mailTitle,
    });
  }
}
