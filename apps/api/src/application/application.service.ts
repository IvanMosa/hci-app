import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        job: { connect: { id: dto.jobId } },
        freelancer: { connect: { id: dto.freelancerId } },
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
}
