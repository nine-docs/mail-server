import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service'; // 서비스 추가
import { MailController } from './mail.controller'; // 컨트롤러 추가
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule 임포트
      inject: [ConfigService], // ConfigService 주입
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('GMAIL_SMTP_HOST'),
          port: Number(configService.get<number>('GMAIL_SMTP_PORT')), // SMTP 포트 (일반적으로 587 또는 465)
          secure:
            configService.get<string>('GMAIL_SMTP_SECURE').toLowerCase() ===
            'true', // TLS 사용 여부 (Gmail의 경우 false, SSL의 경우 true)
          auth: {
            user: configService.get<string>('GMAIL_SMTP_USER'),
            pass: configService.get<string>('GMAIL_SMTP_PASSWORD'),
          },

          pool: true, // 연결 풀링 활성화
          maxConnections: 10, // 최대 연결 수 (적절히 조절)
          maxMessages: 10, // 연결당 최대 메시지 수 (적절히 조절)
          rateLimit: 5, // 초당 최대 메시지 수 (서버 제한에 맞춰 조절)
          rateLimitTimeout: 1000, // 제한 초과 시 대기 시간 (ms)
        },
        // defaults: {
        //   from: 'No Reply ' + configService.get<string>('GMAIL_SMTP_FROM'),
        // },
      }),
    }),
  ],
  controllers: [MailController], // 컨트롤러 등록
  providers: [MailService], // 서비스 등록
  exports: [MailService], // 다른 모듈에서 사용 가능하도록 export
})
export class MailModule {}
