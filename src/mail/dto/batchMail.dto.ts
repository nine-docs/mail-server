import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BatchMailDto {
  @ApiProperty({ description: '수신자 이메일 주소 목록', type: [String] }) // Swagger 문서에 배열임을 명시
  @IsArray() // 배열인지 확인
  @ArrayMinSize(1) // 최소 1개 이상의 이메일 주소가 있어야 함
  @IsString({ each: true }) // 각 요소가 문자열인지 확인
  @IsNotEmpty({ each: true }) // 각 요소가 비어있지 않은지 확인
  @IsEmail({}, { each: true }) // 각 요소가 이메일 형식인지 확인
  @Length(4, 100, { each: true }) // 각 요소의 길이 확인
  addressList: string[];

  @ApiProperty({ description: '질문 내용' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  question: string;

  @ApiProperty({ description: 'Article 링크' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 1000)
  articleLink: string;
}
