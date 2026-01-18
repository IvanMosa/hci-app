import { Injectable } from '@nestjs/common';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FreelancerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.freelancerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            type: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        portfolio: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.freelancerProfile.findUnique({
      where: { id },
    });
  }

  update(id: string, updateFreelancerProfileDto: UpdateFreelancerProfileDto) {
    return this.prisma.freelancerProfile.update({
      where: { id: id },
      data: updateFreelancerProfileDto,
    });
  }

  remove(id: string) {
    return this.prisma.freelancerProfile.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: userId },
    });
    return { data: profile };
  }
}
