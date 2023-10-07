import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    // Check if a user with the same email already exists
    const existingUser = await this.getUserByEmail(userRegister.email);

    if (existingUser) {
      throw new ConflictException('User with the same email already exists.');
    }

    const user = new User();
    user.name = userRegister.name; 
    user.campanyName = userRegister.company;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }
}
