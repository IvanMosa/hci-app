import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsUrl,
} from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  freelancerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title must be at most 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must be at most 500 characters' })
  description?: string;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/.+/, {
    message: 'URL must start with http:// or https://',
  })
  url?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
