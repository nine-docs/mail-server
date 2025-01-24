import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  //   private readonly sesClient: SESClient;
  private readonly configService: ConfigService;

  constructor() {
    // this.sesClient = new SESClient({
    //   region: this.configService.get<string>('AWS_REGION'),
    //   credentials: {
    //     accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
    //     secretAccessKey: this.configService.get<string>(
    //       'AWS_SECRET_ACCESS_KEY',
    //     ),
    //   },
    // });
  }

  async sendEmail(to: string, subject: string, body: string) {
    //     const params = {
    //       Destination: {
    //         ToAddresses: [to],
    //       },
    //       Message: {
    //         Body: {
    //           Html: { Data: `<html><body>${body}</body></html>` }, // HTML 본문
    //         },
    //         Subject: { Data: subject },
    //       },
    //       Source: this.configService.get<string>('process.env.'), // 발신자 이메일
    //     };
    //     try {
    //       const command = new SendEmailCommand(params);
    //       const response = await this.sesClient.send(command);
    //       return response;
    //     } catch (error) {
    //       console.error('Error sending email:', error);
    //       throw error;
    //     }
  }
}
