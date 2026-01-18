import { Injectable } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobCategory, Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category as any,
        budget: new Prisma.Decimal(dto.budget),
        client: {
          connect: { id: dto.clientId },
        },
      },
    });
  }

  async findAll(skip: number, take: number) {
    return this.prisma.job.findMany({
      where: { status: 'active' },
      skip: skip || 0,
      take: take || 12,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    const { clientId, budget, category, ...rest } = updateJobDto;

    return this.prisma.job.update({
      where: { id },
      data: {
        ...rest,
        ...(category && { category: category as JobCategory }),
        ...(budget && { budget: new Prisma.Decimal(budget) }),
        ...(clientId && {
          client: {
            connect: { id: clientId },
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }

  async findByClient(clientId: string, skip: number, take: number) {
    console.log(clientId);
    return this.prisma.job.findMany({
      where: { clientId },
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' },
    });
  }
}
