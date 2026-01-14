import { Module } from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { FreelancerSkillController } from './freelancer-skill.controller';

@Module({
  controllers: [FreelancerSkillController],
  providers: [FreelancerSkillService],
})
export class FreelancerSkillModule {}
