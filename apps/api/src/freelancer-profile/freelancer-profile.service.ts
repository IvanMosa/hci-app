import { Injectable } from '@nestjs/common';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FreelancerProfileService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createFreelancerProfileDto: CreateFreelancerProfileDto) {
  //   return 'This action adds a new freelancerProfile';
  // }

  findAll() {
    return this.prisma.freelancerProfile.findMany();
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
