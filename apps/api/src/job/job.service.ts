import { Injectable } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createJobDto: CreateJobDto) {
  //   return this.prisma.job.create({
  //     data: createJobDto,
  //   });
  // }

  findAll() {
    return this.prisma.job.findMany();
  }

  findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });
  }

  remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
