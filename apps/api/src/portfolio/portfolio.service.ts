import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        freelancer: { connect: { id: dto.freelancerId } },
        title: dto.title,
        description: dto.description,
        url: dto.url,
      },
    });
  }

  findAll() {
    return this.prisma.portfolio.findMany();
  }

  findOne(id: string) {
    return this.prisma.portfolio.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    return this.prisma.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  remove(id: string) {
    return this.prisma.portfolio.delete({
      where: { id },
    });
  }
}
