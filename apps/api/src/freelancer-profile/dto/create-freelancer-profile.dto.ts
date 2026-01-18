import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateFreelancerProfileDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
