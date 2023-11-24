import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationController } from './user_location.controller';
import { UserLocationService } from './user_location.service';

describe('UserLocationController', () => {
  let resolver: UserLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLocationController, UserLocationService],
    }).compile();

    resolver = module.get<UserLocationController>(UserLocationController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});