import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: jest.Mocked<MailService>; // MailService의 모의 객체 타입 선언 - mail이라는 외부 서비스에 의존하기 때문

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn(), // sendEmail 메서드를 Jest 모의 함수로 생성
          },
        },
      ],
    }).compile();

    mailController = module.get(MailController);
    mailService = module.get(MailService); // 수정: jest.Mocked<MailService>로 캐스팅 불필요
  });

  it('이메일 전송 성공 테스트', async () => {
    const address = 'ghqkrshf@naver.com';
    const mailTitle = '테스트 이메일';
    const mailContents = 'ninedocs에서 보낸 테스트 이메일입니다.';

    // sendEmail 메서드가 성공적으로 완료되었을 때의 동작을 모킹
    mailService.sendEmail.mockResolvedValueOnce(undefined);

    const response = await mailController.sendMail({
      address,
      mailTitle,
      mailContents,
    });

    expect(response).toEqual({
      success: true,
    });
    expect(mailService.sendEmail).toHaveBeenCalledWith(
      address,
      mailTitle,
      mailContents,
    );
  });

  it('이메일 전송 실패 시 에러 처리 테스트', async () => {
    const address = 'recipient@example.com';
    const mailTitle = '테스트 이메일';
    const mailContents = 'NestJS에서 보낸 테스트 이메일입니다.';

    // sendEmail 메서드가 에러를 발생시키도록 모킹
    mailService.sendEmail.mockRejectedValueOnce(new Error('이메일 전송 실패'));

    const response = await mailController.sendMail({
      address,
      mailTitle,
      mailContents,
    });

    expect(response).toEqual({ message: 'Failed to send email.' });
    // sendEmail 메서드가 올바른 인자로 호출되었는지 확인
    expect(mailService.sendEmail).toHaveBeenCalledWith(
      address,
      mailTitle,
      mailContents,
    );
  });
});
