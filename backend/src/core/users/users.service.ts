import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersConfig } from '../../../src/config/users.config';

@Injectable()
export class UserService {
  configs: UsersConfig;

  constructor(private readonly configService: ConfigService) {
    this.configs = configService.get<UsersConfig>('users_definition');
  }

  findAll() {
    return this.configs;
  }
}
