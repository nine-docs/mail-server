import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { readHtmlFile, replacePlaceholders } from '../utils/template.util';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly awsService: AwsService,
  ) {}

  sendCommonMail(address: string, mailTitle: string, mailContents: string) {
    const html = readHtmlFile('common-template.html');
    if (!html) {
      console.error('HTML 템플릿을 찾을 수 없습니다.');
      throw new Error();
    }

    const htmlToSend = replacePlaceholders(html, {
      mailContents,
    });

    this.awsService
      .sendEmail([address], mailTitle, htmlToSend)
      .catch((error) => {
        // Promise의 catch 메서드를 사용하여 에러 처리
        console.error('전송에 실패했습니다 : ', error);
      });

    // 동기처리 X
    // 실패와 상관없이 전송을 기다리지는 않습니다.
    // try와 await 동기처리를 같이 쓰지 않으면 에러가 발생합니다.
    // try캐치 안에 있어도, 비동기처리면, 서버가 터짐.
  }

  sendVerificationMail(address: string, verificationCode: string) {
    const html = readHtmlFile('verification-template.html');
    if (!html) {
      console.error('HTML 템플릿을 찾을 수 없습니다.');
      throw new Error();
    }

    const htmlToSend = replacePlaceholders(html, {
      verificationCode,
    });

    this.awsService
      .sendEmail([address], '구docs에서 보낸 인증메일입니다.', htmlToSend)
      .catch((error) => {
        // Promise의 catch 메서드를 사용하여 에러 처리
        console.error('전송에 실패했습니다 : ', error);
      });

    // 실패와 상관없이 전송합니다.
    // try와 await 동기처리를 같이 쓰지 않으면 에러가 발생합니다.
    // try캐치 안에 있어도, 비동기처리면, 서버가 터짐.
  }

  sendBatchMail(addressList: string[], question: string, articleLink: string) {
    const html = readHtmlFile('batch-template.html');
    if (!html) {
      console.error('HTML 템플릿을 찾을 수 없습니다.');
      throw new Error();
    }

    const htmlToSend = replacePlaceholders(html, {
      question,
      articleLink,
    });

    try {
      this.awsService
        .sendEmail(addressList, question, htmlToSend)
        .catch((error) => {
          // Promise의 catch 메서드를 사용하여 에러 처리
          console.error('전송에 실패했습니다 : ', error);
        });
      return { message: 'HTML 이메일 전송 성공' };
    } catch (error) {
      console.error('HTML 이메일 전송 실패:', error);
    }
  }
}
