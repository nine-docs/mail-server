import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonMailDto {
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
    description: '메일 제목',
    minLength: 4, // 최소 길이 명시
    maxLength: 100, // 최대 길이 명시
    example: '구docs에서 안내메일드립니다. (4~100자)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  mailTitle: string;

  @ApiProperty({
    description: '메일 내용',
    minLength: 4, // 최소 길이 명시
    maxLength: 1000, // 최대 길이 명시
    example: '고객의 계정은 탈퇴 조치되었습니다. (4~1000자)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 1000)
  mailContents: string;
}
