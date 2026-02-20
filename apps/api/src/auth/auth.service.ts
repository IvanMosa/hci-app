import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { RegistrationDto } from './auth.dto';
import { UserType } from '@prisma/client';

interface JwtResponseDto {
  accessToken: string;
  userId?: string;
  userType?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, password: string): Promise<JwtResponseDto> {
    const loginUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        password: true,
        type: true,
      },
    });

    if (!loginUser) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const passwordsMatch = await compare(password, loginUser.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const accessToken = this.jwtService.sign({
      id: loginUser.id,
      email: loginUser.email,
      name: loginUser.name,
      surname: loginUser.surname,
      type: loginUser.type,
    });

    return { accessToken, userId: loginUser.id, userType: loginUser.type };
  }

  async userRegister(register: RegistrationDto): Promise<JwtResponseDto> {
    const existingActiveEmailUser = await this.prisma.user.findFirst({
      where: {
        email: register.email,
      },
    });

    if (existingActiveEmailUser) {
      throw new BadRequestException('User with this email already exists!');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(register.password, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        email: register.email,
        name: register.name,
        surname: register.surname,
        password: hashedPassword,
        type:
          register.type.toLowerCase() === 'freelancer'
            ? UserType.freelancer
            : UserType.client,
        dateOfBirth: new Date(register.dateOfBirth),
      },
    });

    await this.prisma.freelancerProfile.create({
      data: {
        userId: newUser.id,
        bio: '',
        location: '',
      },
    });

    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
    });

    return { accessToken, userId: newUser.id, userType: newUser.type };
  }
}
