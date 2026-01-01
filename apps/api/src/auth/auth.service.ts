import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { RegistrationDto } from './auth.dto';

interface JwtResponseDto {
  accessToken: string;
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
      },
    });

    if (!loginUser) {
      throw new BadRequestException('Wrong username or password');
    }

    const passwordsMatch = await compare(password, loginUser.password);
    if (!passwordsMatch) {
      throw new BadRequestException('Wrong username or password');
    }

    const accessToken = this.jwtService.sign({
      id: loginUser.id,
      email: loginUser.email,
      name: loginUser.name,
      surname: loginUser.surname,
    });

    return { accessToken };
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
        type: register.type,
        dateOfBirth: register.dateOfBirth,
      },
    });

    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
    });

    return { accessToken };
  }
}
