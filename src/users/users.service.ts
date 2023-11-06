import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repository/user.repository';
import { comparePassword, generateHassPassword } from 'src/utility/password-manager';
import { generateAuthToken } from 'src/utility/token-generator';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      // generate the hash password
      createUserDto.password = await generateHassPassword(createUserDto.password);

      // check is it for admin
      if (createUserDto.type === userTypes.ADMIN && 
        createUserDto.secretToken !== process.env.adminSecretToken
      ) {
        throw new Error('Not allowed to create admin');
      }

      // user is already exist
      const user = await this.userDB.findOne({
        email: createUserDto.email
      })
      if (user) {
        throw new Error('User already exist!');
      }

      // generate the otp
      const otp = Math.floor(Math.random() * 900000) * 100000;
      const otpExpiryTime = new Date()
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      // create 
      const newUser = await this.userDB.create({
        ...createUserDto,
        otp,
        otpExpiryTime
      })

      return {
        success: true,
        message: 'User created successfully!',
        result: {email: newUser.email}
      }

    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userExists = await this.userDB.findOne({email})
      if (!userExists) {
        throw new Error('Invalid email or password')
      }
      const isPasswordMatch = await comparePassword(
        password,
        userExists.password,
      )
      if (!isPasswordMatch) {
        throw new Error('Invalid email or password')
      }
      const token = await generateAuthToken(userExists._id)
      return {
        success: true,
        message: 'Login successfully!',
        result: {
          user: {
            name: userExists.name,
            email: userExists.email,
            type: userExists.type,
            id: userExists._id.toString()
          },
          token
        }
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
