import { Module } from '@nestjs/common';
import { FreelancerProfileService } from './freelancer-profile.service';
import { FreelancerProfileController } from './freelancer-profile.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FreelancerProfileController],
  providers: [FreelancerProfileService, PrismaService],
})
export class FreelancerProfileModule {}
