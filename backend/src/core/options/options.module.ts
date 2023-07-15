import { Module } from '@nestjs/common';

import { OptionsController } from './options.controller';
import { OptionService } from './options.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [OptionService],
})
export class OptionsModule {}
