import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  addUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      id: createUserDto.id ? createUserDto.id : nanoid(),
      ...createUserDto,
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update({ id }, updateUserDto);
      return this.userRepository.findOne({ id });
    } catch (error) {
      return null;
    }
  }

  async deleteAll() {
    try {
      await this.userRepository.delete({});
    } catch (error) {
      console.log('[TypeORM]: error deleting all users', error);
    }
  }
}
