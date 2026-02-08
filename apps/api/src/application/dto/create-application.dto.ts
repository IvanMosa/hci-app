import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @IsString()
  @IsOptional()
  proposal?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  bidAmount?: number;
}
