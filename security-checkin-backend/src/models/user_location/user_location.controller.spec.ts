import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationController } from './user_location.controller';
import { UserLocationService } from './user_location.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';

describe('UserLocationController', () => {
    let resolver: UserLocationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserLocationService, LocationService, UserService],
            controllers: [UserLocationController],
            imports: [PrismaModule],
            exports: [UserLocationService],
        }).compile();

        resolver = module.get<UserLocationController>(UserLocationController);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});