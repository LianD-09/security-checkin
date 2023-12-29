import { Module } from '@nestjs/common';
import { ConfigAppController } from './configApp.controller';

@Module({
  controllers: [ConfigAppController],
})
export class ConfigAppModule {}
