import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

const userSelectWithoutPassword = {
  id: true,
  name: true,
  surname: true,
  email: true,
  type: true,
  phone: true,
  dateOfBirth: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: userSelectWithoutPassword,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: userSelectWithoutPassword,
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: userSelectWithoutPassword,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      select: userSelectWithoutPassword,
    });
  }
}
