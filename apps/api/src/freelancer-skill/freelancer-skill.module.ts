import { Module } from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { FreelancerSkillController } from './freelancer-skill.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FreelancerSkillController],
  providers: [FreelancerSkillService, PrismaService],
})
export class FreelancerSkillModule {}
