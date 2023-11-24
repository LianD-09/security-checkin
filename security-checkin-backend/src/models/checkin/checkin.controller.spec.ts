import { Test, TestingModule } from '@nestjs/testing';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';

describe('CheckinController', () => {
  let resolver: CheckinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinController, CheckinService],
    }).compile();

    resolver = module.get<CheckinController>(CheckinController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});