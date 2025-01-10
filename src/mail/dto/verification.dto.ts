import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
  @ApiProperty({ description: '수신자 이메일 주소' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  address: string;

  @ApiProperty({ description: '인증 코드 (숫자 6자리)' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @Matches(/^[0-9]{6}$/) // 숫자 6자리
  verificationCode: string;
}
