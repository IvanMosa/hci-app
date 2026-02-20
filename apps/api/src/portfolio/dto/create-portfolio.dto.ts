import { IsString, IsOptional } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  freelancerId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
