import { Injectable } from '@nestjs/common';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FreelancerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip: number, take: number) {
    return this.prisma.freelancerProfile.findMany({
      skip,
      take,
      where: {
        user: {
          type: 'freelancer',
        },
      },
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
      orderBy: { id: 'desc' },
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

  updateByUserId(
    userId: string,
    updateFreelancerProfileDto: UpdateFreelancerProfileDto,
  ) {
    return this.prisma.freelancerProfile.upsert({
      where: { userId: userId },
      update: updateFreelancerProfileDto,
      create: { userId, ...updateFreelancerProfileDto },
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
    return { data: profile };
  }
}
