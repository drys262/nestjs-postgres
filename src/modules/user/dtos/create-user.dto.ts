import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id?: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  petExperience: string;
}
