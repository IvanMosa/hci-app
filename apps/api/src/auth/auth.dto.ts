import { ApiProperty } from '@nestjs/swagger';
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
  role: 'freelancer' | 'client';
};

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  password: string;
}

export class RegistrationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'John' })
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'Doe' })
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password123' })
  password: string;

  @IsEnum(UserType)
  @ApiProperty({
    example: UserType.freelancer,
    enum: UserType,
  })
  type: UserType;

  @Transform(({ value }: { value: string | number | Date }) => new Date(value))
  @IsDate()
  @ApiProperty({ example: '1990-01-01' })
  dateOfBirth: Date;
}
