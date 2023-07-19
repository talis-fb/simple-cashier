import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import usersConfig from '../../config/users.config';

import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [usersConfig],
    }),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
