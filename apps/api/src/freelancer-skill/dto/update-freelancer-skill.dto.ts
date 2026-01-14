import { PartialType } from '@nestjs/swagger';
import { CreateFreelancerSkillDto } from './create-freelancer-skill.dto';

export class UpdateFreelancerSkillDto extends PartialType(
  CreateFreelancerSkillDto,
) {}
