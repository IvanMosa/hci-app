import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFreelancerSkillDto {
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @IsString()
  @IsNotEmpty()
  skillId: string;
}
