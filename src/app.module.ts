import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true, // 전역 모듈로 사용
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
