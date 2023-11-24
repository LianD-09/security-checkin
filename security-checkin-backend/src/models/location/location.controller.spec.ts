import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('LocationController', () => {
  let resolver: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
      controllers: [LocationController],
      imports: [PrismaModule],
      exports: [LocationService],
    }).compile();

    resolver = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});