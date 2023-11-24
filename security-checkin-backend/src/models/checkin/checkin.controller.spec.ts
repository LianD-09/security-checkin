import { Test, TestingModule } from '@nestjs/testing';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { LocationModule } from '../location/location.module';

describe('CheckinController', () => {
  let resolver: CheckinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinService],
      controllers: [CheckinController],
      imports: [PrismaModule, UserModule, LocationModule],
      exports: [CheckinService],
    }).compile();

    resolver = module.get<CheckinController>(CheckinController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});