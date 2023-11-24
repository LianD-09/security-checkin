import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserLocationService } from './user_location.service';
import { UserLocationController } from './user_location.controller';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [UserLocationService, LocationService, UserService],
  controllers: [UserLocationController],
  imports: [PrismaModule],
  exports: [UserLocationService],
})
export class UserLocationModule { }
