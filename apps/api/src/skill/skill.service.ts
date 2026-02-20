import { Injectable } from '@nestjs/common';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.skill.findMany();
  }

  findOne(id: string) {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.prisma.skill.update({
      where: { id },
      data: updateSkillDto,
    });
  }

  remove(id: string) {
    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
