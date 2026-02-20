import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto) {
    // dto.freelancerId is the User ID from JWT — resolve to FreelancerProfile
    const profile = await this.prisma.freelancerProfile.findUnique({
      where: { userId: dto.freelancerId },
    });
    if (!profile) {
      throw new NotFoundException('No freelancer profile found for this user');
    }
    return this.prisma.portfolio.create({
      data: {
        freelancer: { connect: { id: profile.id } },
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

  async updateIfOwner(id: string, dto: UpdatePortfolioDto, userId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { freelancer: true },
    });
    if (!portfolio || portfolio.freelancer?.userId !== userId) {
      throw new ForbiddenException('You can only update your own portfolio');
    }
    return this.update(id, dto);
  }

  async removeIfOwner(id: string, userId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { freelancer: true },
    });
    if (!portfolio || portfolio.freelancer?.userId !== userId) {
      throw new ForbiddenException('You can only delete your own portfolio');
    }
    return this.remove(id);
  }
}
