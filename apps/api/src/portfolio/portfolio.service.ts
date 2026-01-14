import { Injectable } from '@nestjs/common';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createPortfolioDto: CreatePortfolioDto) {
  //   return 'This action adds a new portfolio';
  // }

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
