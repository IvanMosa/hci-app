import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsDate,
} from 'class-validator';
import { UserType } from 'generated/prisma/enums';

type JwtPayload = {
  id: number;
  name: string;
  username: string;
  role: 'sponsor';
};

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export type UserJwtPayload = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user';
};

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserType)
  type: UserType;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;
}
