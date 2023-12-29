import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './models/user/user.module';
import { LocationModule } from './models/location/location.module';
import { CheckinModule } from './models/checkin/checkin.module';
import { UserLocationModule } from './models/user_location/user_location.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigAppModule } from './models/config/configApp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    PrismaModule,
    UserModule,
    LocationModule,
    CheckinModule,
    UserLocationModule,
    ConfigAppModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    }],
})
export class AppModule { }
