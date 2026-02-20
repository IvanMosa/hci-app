import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStatus, Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateApplicationDto) {
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: dto.freelancerId },
    });

    if (!profile) {
      throw new NotFoundException(
        'No freelancer profile found for this user. Only freelancers can apply.',
      );
    }

    return this.prisma.application.create({
      data: {
        job: { connect: { id: dto.jobId } },
        freelancer: { connect: { id: profile.id } },
        proposal: dto.proposal,
        ...(dto.bidAmount != null && {
          bidAmount: new Prisma.Decimal(dto.bidAmount),
        }),
      },
      include: {
        job: true,
        freelancer: { include: { user: true } },
      },
    });
  }

  findAll() {
    return this.prisma.application.findMany({
      include: {
        job: true,
        freelancer: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        freelancer: { include: { user: true } },
      },
    });
  }

  update(id: string, dto: UpdateApplicationDto) {
    return this.prisma.application.update({
      where: { id },
      data: {
        ...(dto.proposal !== undefined && { proposal: dto.proposal }),
        ...(dto.bidAmount != null && {
          bidAmount: new Prisma.Decimal(dto.bidAmount),
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.application.delete({
      where: { id },
    });
  }

  updateStatus(id: string, status: 'accepted' | 'rejected') {
    return this.prisma.application.update({
      where: { id },
      data: { status: status as ApplicationStatus },
      include: {
        job: true,
        freelancer: {
          include: {
            user: { select: { name: true, surname: true, email: true } },
          },
        },
      },
    });
  }

  findByJob(jobId: string) {
    return this.prisma.application.findMany({
      where: { jobId },
      include: {
        freelancer: {
          include: {
            user: { select: { name: true, surname: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByFreelancer(freelancerId: string) {
    return this.prisma.application.findMany({
      where: { freelancerId },
      include: {
        job: {
          include: {
            client: { select: { name: true, surname: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByFreelancerIfOwner(freelancerId: string, userId: string) {
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { id: freelancerId },
    });
    if (!profile || profile.userId !== userId) {
      throw new ForbiddenException('You can only view your own applications');
    }
    return this.findByFreelancer(freelancerId);
  }

  findByClient(clientId: string) {
    return this.prisma.application.findMany({
      where: {
        job: { clientId },
      },
      include: {
        job: {
          select: { id: true, title: true, budget: true, status: true },
        },
        freelancer: {
          include: {
            user: { select: { name: true, surname: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateIfOwner(id: string, dto: UpdateApplicationDto, userId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { freelancer: true },
    });
    if (!application || application.freelancer?.userId !== userId) {
      throw new ForbiddenException('You can only update your own applications');
    }
    return this.update(id, dto);
  }

  async updateStatusIfJobOwner(
    id: string,
    status: 'accepted' | 'rejected',
    userId: string,
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });
    if (application?.job?.clientId !== userId) {
      throw new ForbiddenException(
        'Only the job owner can accept/reject applications',
      );
    }
    return this.updateStatus(id, status);
  }

  async removeIfOwner(id: string, userId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { freelancer: true },
    });
    if (!application || application.freelancer?.userId !== userId) {
      throw new ForbiddenException('You can only delete your own applications');
    }
    return this.remove(id);
  }
}
