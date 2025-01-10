import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

describe('MailService', () => {
  let service: MailService;
  let mockMailerService = { sendMail: jest.fn() };

  // const mockConfigService = { get: jest.fn() }; // 개발자가 제어할 수 있는 값에 대해서는 모킹하지 않습니다. (테스트에서)
  let configValue = 'tennfin1@gmail.com'; //실제 값을 대입

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mockMailerService },
        {
          provide: ConfigService, //근데, mail Service에서는 의존성이 발생하므로, mocking
          useValue: {
            get: jest.fn().mockReturnValue(configValue),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('send test success', async () => {
    const emailData = {
      address: 'test@example.com',
      mailTitle: 'Test Title',
      mailContents: 'Test Content',
    };
    (mockMailerService.sendMail as jest.Mock).mockResolvedValue(true); //개발자가 제어할 수 없는 값에 대해서만 모킹합니다.

    await service.sendEmail(
      emailData.address,
      emailData.mailTitle,
      emailData.mailContents,
    );

    // 기대값
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: emailData.address,
      from: configValue,
      subject: emailData.mailTitle,
      text: emailData.mailContents,
    });
  });
});
