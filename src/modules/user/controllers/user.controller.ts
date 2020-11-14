import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Query('email') email: string) {
    if (!email) {
      return this.userService.getUsers();
    }

    return this.userService.getUserByEmail(email);
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser({ ...createUserDto });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() { id }: { id: string }) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param() { id }: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, { ...updateUserDto });
  }
}
