import { IsEmail } from 'class-validator';

class UserRegisterDTO {
  @IsEmail()
  email: string;
}

export { UserRegisterDTO };
