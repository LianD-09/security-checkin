import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from '../../auth/auth.service';

describe('UserController', () => {
  let resolver: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, AuthService],
      controllers: [UserController],
      imports: [PrismaModule],
      exports: [UserService],
    }).compile();

    resolver = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});