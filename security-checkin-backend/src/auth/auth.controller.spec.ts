import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('AuthController', () => {
  let resolver: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
      imports: [PrismaModule],
      exports: [AuthService],
    }).compile();

    resolver = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});