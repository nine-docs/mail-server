import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { readHtmlFile, replacePlaceholders } from '../utils/template.util';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  sendCommonMail(address: string, mailTitle: string, mailContents: string) {
    this.mailerService.sendMail({
      to: address,
      from: this.configService.get<string>('GMAIL_SMTP_USER'),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>일반 메일입니다. 메일 내용은 다음과 같습니다.</title>
      </head>
      <body>
      
        <button type="button">${mailContents}</button>
      
      </body>
      </html>
  `, // HTML 콘텐츠
      subject: mailTitle,
    });
  }

  sendVerificationMail(address: string, verificationCode: string) {
    this.mailerService.sendMail({
      to: address,
      from: this.configService.get<string>('GMAIL_SMTP_USER'),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>다음은 인증코드입니다.</title>
      </head>
      <body>
      
        <button type="button">${verificationCode}</button>
      
      </body>
      </html>
  `, // HTML 콘텐츠
      subject: '9docs에서 온 인증코드 입니다.',
    });
  }

  async sendBatchMail(
    addressList: string[],
    question: string,
    articleLink: string,
  ) {
    const html = readHtmlFile('mail-template.html');
    if (!html) {
      console.error('HTML 템플릿을 찾을 수 없습니다.');
      throw new Error();
    }

    const htmlToSend = replacePlaceholders(html, {
      question,
      articleLink,
    });

    try {
      await this.mailerService.sendMail({
        to: addressList,
        from: '보내는 사람 이메일 주소',
        subject: question,
        html: htmlToSend,
      });
      return { message: 'HTML 이메일 전송 성공' };
    } catch (error) {
      console.error('HTML 이메일 전송 실패:', error);
    }
  }
}
