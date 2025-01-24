import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonMailDto } from './dto/common-mail.dto';
import { VertificationMailDto } from './dto/verification-mail.dto';
import { BatchMailDto } from './dto/batch-mail.dto';

@ApiTags('mail Server API')
@Controller('api/v1/mail')
@UsePipes(new ValidationPipe())
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: '헬스 체크', description: '서비스 상태 확인' })
  @ApiOkResponse({
    description: '정상 작동',
    schema: {
      type: 'object',
      properties: { success: { type: 'boolean', example: true } },
    },
  })
  @Get('health')
  async healthCheck() {
    return {
      success: true,
    };
  }

  @ApiOperation({
    summary: '일반 메일 전송',
    description:
      '일반 메일 전송 요청을 처리합니다. 외부의 메일요청에 대해, 통신 결과를 기다리지 않고 반환합니다.',
    responses: {
      200: {
        description: '성공적으로 메일 전송 요청 완료',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                errorCode: { type: 'string', nullable: true, example: null },
                message: {
                  type: 'string',
                  example: '일반 메일 전송 요청을 완료했습니다.',
                },
              },
            },
          },
        },
      },
      400: { description: '잘못된 요청 (예: 필수 필드 누락)' },
      500: { description: '서버 오류' },
    },
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
        success: true, // boolean
        errorCode: null, // string
        data: '일반메일 전송을 요청하는데 성공했습니다.',
      };
    } catch (error) {
      console.error('일반메일 전송 요청 실패:', error);
      throw new HttpException(
        '일반메일 전송을 요청하는데 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 에러 코드
      );
    }
  }

  @ApiOperation({
    summary: '인증 메일 전송',
    description:
      '인증 메일 전송 요청을 처리합니다. 외부의 메일요청에 대해, 통신 결과를 기다리지 않고 반환합니다.',
    responses: {
      200: {
        description: '성공적으로 인증 메일 전송 요청 완료',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                errorCode: { type: 'string', nullable: true, example: null },
                message: {
                  type: 'string',
                  example: '인증 메일 전송 요청을 완료했습니다.',
                },
              },
            },
          },
        },
      },
      400: { description: '잘못된 요청 (예: 필수 필드 누락)' },
      500: { description: '서버 오류' },
    },
  })
  @Post('verification')
  async sendVerificationMail(@Body() body: VertificationMailDto) {
    try {
      await this.mailService.sendVerificationMail(
        body.address,
        body.verificationCode,
      );
      return {
        success: true, // boolean
        errorCode: null, // string
        data: '인증메일 전송을 요청하는데 성공했습니다.',
      };
    } catch (error) {
      console.error('인증메일 전송 요청 실패:', error);
      throw new HttpException(
        '인증메일 전송을 요청하는데 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 에러 코드
      );
    }
  }

  @ApiOperation({
    summary: '배치 메일 전송',
    description:
      '배치 메일 전송을 처리합니다. 외부의 메일요청에 대해, 통신 결과를 기다리고 반환합니다.',
    responses: {
      200: {
        description: '성공적으로 배치 메일 전송 완료',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                errorCode: { type: 'string', nullable: true, example: null },
                message: {
                  type: 'string',
                  example: '배치메일을 전송하는데 성공했습니다.',
                },
              },
            },
          },
        },
      },
      400: { description: '잘못된 요청 (예: 필수 필드 누락)' },
      500: { description: '서버 오류' },
    },
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
        success: true, // boolean
        errorCode: null, // string
        data: '배치메일을 전송하는데 성공했습니다.',
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
