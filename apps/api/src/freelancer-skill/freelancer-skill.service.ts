import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';

@Injectable()
export class FreelancerSkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFreelancerSkillDto) {
    // dto.freelancerId is the User ID from JWT — resolve to FreelancerProfile
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: dto.freelancerId },
    });
    if (!profile) {
      throw new NotFoundException('No freelancer profile found for this user');
    }
    return this.prisma.freelancerSkill.create({
      data: {
        freelancer: { connect: { id: profile.id } },
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

  async removeIfOwner(freelancerId: string, skillId: string, userId: string) {
    // freelancerId is a FreelancerProfile ID — verify it belongs to the user
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { id: freelancerId },
    });
    if (!profile || profile.userId !== userId) {
      throw new ForbiddenException('You can only manage your own skills');
    }
    return this.remove(freelancerId, skillId);
  }
}
