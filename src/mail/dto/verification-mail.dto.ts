import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VertificationMailDto {
  @ApiProperty({
    description: '수신자 이메일 주소',
    minLength: 4, // 최소 길이 명시
    maxLength: 100, // 최대 길이 명시
    example: 'test@example.com (4~100자)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  address: string;

  @ApiProperty({
    description: '인증코드',
    minLength: 6, // 최소 길이 명시
    maxLength: 6, // 최대 길이 명시
    example: '123456 (6자리)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @Matches(/^[0-9]{6}$/) // 숫자 6자리
  verificationCode: string;
}
