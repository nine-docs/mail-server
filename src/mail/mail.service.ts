import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendCommonMail(
    address: string,
    mailTitle: string,
    mailContents: string,
  ) {
    await this.mailerService.sendMail({
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

  async sendBatchMail(
    addressList: string[],
    question: string,
    articleLink: string,
  ) {
    await this.mailerService.sendMail({
      to: addressList,
      from: this.configService.get<string>('GMAIL_SMTP_USER'),
      html: `
      <!DOCTYPE html>
<html>
<head>
  <title> ${'오늘의 질문 : '} ${question}</title>
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      background-color: #4CAF50; /* Green */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <a href="${articleLink}" class="button">답변 보러 가기</a>

</body>
</html>
  `, // HTML 콘텐츠
      subject: question,
    });
  }

  async sendVerificationMail(address: string, verificationCode: string) {
    await this.mailerService.sendMail({
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
}
