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
  @ApiProperty({
    description: '수신자 이메일 주소 목록 (각 4~100자, 최소 1개)',
    items: {
      // 배열 요소의 속성 정의
      type: 'string',
      minLength: 4, // 각 요소의 최소 길이
      maxLength: 100, // 각 요소의 최대 길이
      example: 'test@example.com', // 각 요소의 예시
    },
    example: ['test1@example.com', 'test2@example.com'], // 배열 전체의 예시
  })
  @IsArray() // 배열인지 확인
  @ArrayMinSize(1) // 최소 1개 이상의 이메일 주소가 있어야 함
  @IsString({ each: true }) // 각 요소가 문자열인지 확인
  @IsNotEmpty({ each: true }) // 각 요소가 비어있지 않은지 확인
  @IsEmail({}, { each: true }) // 각 요소가 이메일 형식인지 확인
  @Length(4, 100, { each: true }) // 각 요소의 길이 확인
  addressList: string[];

  @ApiProperty({
    description: '질문 내용',
    minLength: 4, // 최소 길이 명시
    maxLength: 100, // 최대 길이 명시
    example: '구글의 주소는 어디일까요? (4~100자)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  question: string;

  @ApiProperty({
    description: 'Article 링크',
    minLength: 4, // 최소 길이 명시
    maxLength: 1000, // 최대 길이 명시
    example: 'google.com (4~100자)',
    required: true, // 필수 속성 명시
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 1000)
  articleLink: string;
}
