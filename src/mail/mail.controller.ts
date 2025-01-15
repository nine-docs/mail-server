import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonMailDto } from './dto/common-mail.dto';
import { VertificationMailDto } from './dto/verification-mail.dto';
import { BatchMailDto } from './dto/batch-mail.dto';

@ApiTags('mail Server API')
@Controller('api/v1/mail')
@UsePipes(new ValidationPipe())
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: '일반 메일 전송' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 일반 메일 전송 요청 완료',
  })
  @Post()
  async sendMail(@Body() body: CommonMailDto) {
    try {
      await this.mailService.sendCommonMail(
        body.address,
        body.mailTitle,
        body.mailContents,
      );
      return {
        status: 201,
        message: '일반메일 요청에 성공했습니다.',
      };
    } catch (error) {
      console.error('일반메일 전송 요청 실패:', error);
      throw new HttpException(
        '일반메일 전송을 요청하는데 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 에러 코드
      );
    }
  }

  @ApiOperation({ summary: '인증 메일 전송' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 인증 메일 전송 요청 완료',
  })
  @Post('verification')
  async sendVerificationMail(@Body() body: VertificationMailDto) {
    try {
      await this.mailService.sendVerificationMail(
        body.address,
        body.verificationCode,
      );
      return {
        status: 201,
        message: '인증메일 요청에 성공했습니다.',
      };
    } catch (error) {
      console.error('인증메일 전송 요청 실패:', error);
      throw new HttpException(
        '인증메일 전송을 요청하는데 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 에러 코드
      );
    }
  }

  @ApiOperation({ summary: '배치 메일 전송' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 배치 요청 및, 전송 완료',
  })
  @Post('batch')
  async sendBatchMail(@Body() body: BatchMailDto) {
    try {
      await this.mailService.sendBatchMail(
        body.addressList,
        body.question,
        body.articleLink,
      );
      return {
        status: 201,
        message: '배치메일 전송에 성공했습니다.',
      };
    } catch (error) {
      console.error('배치메일 전송 실패:', error);
      throw new HttpException(
        '배치메일 전송에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 에러 코드
      );
    }
  }
}
