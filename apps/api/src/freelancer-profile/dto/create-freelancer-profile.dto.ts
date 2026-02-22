import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateFreelancerProfileDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  hourlyRate?: number;
}
