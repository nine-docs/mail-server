import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMailDto } from './mail.dto';

@ApiTags('mail Server API')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: '메일 전송 테스트' })
  @ApiResponse({ status: 201, description: '성공적으로 메일 전송 완료' })
  @Post()
  async sendMail(@Body() body: SendMailDto) {
    try {
      await this.mailService.sendEmail(
        body.address,
        body.mailTitle,
        body.mailContents,
      );
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send email.' };
    }
  }
}
