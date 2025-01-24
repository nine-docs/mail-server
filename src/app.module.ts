import { Global, Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true, // 전역 모듈로 사용
    }),
    MailModule,
    AwsModule,
  ],
  providers: [],
})
export class AppModule {}
