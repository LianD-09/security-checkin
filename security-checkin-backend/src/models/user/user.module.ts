import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService, AuthService],
  controllers: [UserController],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
