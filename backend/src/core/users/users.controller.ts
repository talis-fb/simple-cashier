import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
