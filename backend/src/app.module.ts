import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import googleSheetsConfig from './config/google-sheets.config';
import optionsConfig from './config/options.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleSheetsConfig, optionsConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
