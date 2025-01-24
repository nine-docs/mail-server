import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService], // UsersService를 providers로 등록
  exports: [AwsService],
})
export class AwsModule {}
