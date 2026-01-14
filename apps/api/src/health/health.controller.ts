import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => {
        try {
          await this.prisma.$queryRaw`SELECT 1`;
          return {
            database: {
              status: 'up',
            },
          };
        } catch (error) {
          throw new Error('Database connection failed');
        }
      },
    ]);
  }
}
