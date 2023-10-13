import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [CheckinService],
  controllers: [CheckinController],
  imports: [PrismaModule, UserModule, LocationModule],
  exports: [CheckinService],
})
export class CheckinModule {}
