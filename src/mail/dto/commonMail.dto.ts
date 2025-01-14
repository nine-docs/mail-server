import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonMailDto {
  @ApiProperty({ description: '수신자 이메일 주소' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 100)
  address: string;

  @ApiProperty({ description: '메일 제목' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  mailTitle: string;

  @ApiProperty({ description: '메일 내용' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 1000)
  mailContents: string;
}
