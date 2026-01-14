import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FreelancerSkillService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createFreelancerSkillDto: CreateFreelancerSkillDto) {
  //   return 'This action adds a new freelancerSkill';
  // }

  findAll() {
    return this.prisma.freelancerSkill.findMany();
  }

  findSkillsByFreelancerId(id: string) {
    return this.prisma.freelancerSkill.findMany({
      where: { freelancerId: id },
    });
  }
}
