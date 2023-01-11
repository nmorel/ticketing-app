import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { randomDelay } from '../utils/random-delay';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.users();
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    await randomDelay();
    const user = await this.usersService.user(Number(userId));
    if (user) return user;
    throw new NotFoundException();
  }
}
