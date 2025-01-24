import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AwsService], // UsersService를 providers로 등록
  exports: [AwsService],
})
export class AwsModule {}
