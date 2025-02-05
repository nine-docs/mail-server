import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true, // 전역 모듈로 사용
    }),
    MailModule,
  ],
  providers: [],
})
export class AppModule {}
