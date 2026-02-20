import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s-]{7,15}$/, {
    message: 'Phone number must be a valid format',
  })
  phone?: string;
}
