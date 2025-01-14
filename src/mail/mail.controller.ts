import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonMailDto } from './dto/commonMail.dto';
import { VertificationMailDto } from './dto/verificationMail.dto';
import { BatchMailDto } from './dto/batchMail.dto';

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
        success: true,
      };
    } catch (error) {
      console.error('일반메일 전송 요청 실패:', error);
      return { message: '일반메일전송을 요청하는데 실패했습니다.' };
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
        success: true,
      };
    } catch (error) {
      console.error('인증메일 전송 요청 실패:', error);
      return { message: '인증메일전송을 요청하는데 실패했습니다.' };
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
        success: true,
      };
    } catch (error) {
      console.error('배치 메일 전송 실패:', error);
      return { message: '배치메일을 전송하는데 실패했습니다.' };
    }
  }
}
