import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';

@Injectable()
export class FreelancerSkillService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFreelancerSkillDto) {
    return this.prisma.freelancerSkill.create({
      data: {
        freelancer: { connect: { id: dto.freelancerId } },
        skill: { connect: { id: dto.skillId } },
      },
      include: { skill: true },
    });
  }

  findAll() {
    return this.prisma.freelancerSkill.findMany({
      include: { skill: true },
    });
  }

  findSkillsByFreelancerId(id: string) {
    return this.prisma.freelancerSkill.findMany({
      where: { freelancerId: id },
      include: { skill: true },
    });
  }

  remove(freelancerId: string, skillId: string) {
    return this.prisma.freelancerSkill.delete({
      where: {
        freelancerId_skillId: { freelancerId, skillId },
      },
    });
  }
}
