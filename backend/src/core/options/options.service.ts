import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OptionConfig } from '../../../src/config/options.config';

@Injectable()
export class OptionService {
  options: OptionConfig;

  constructor(private readonly configService: ConfigService) {
    this.options = configService.get<OptionConfig>('options_definition');
  }

  findAll() {
    return this.options;
  }

  findOne(name: string) {
    return this.options.filter(el => el.titulo == name);
  }
}
