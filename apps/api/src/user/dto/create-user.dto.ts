import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s-]{7,15}$/, {
    message: 'Phone number must be a valid format',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Split, Croatia' })
  location?: string;
}
