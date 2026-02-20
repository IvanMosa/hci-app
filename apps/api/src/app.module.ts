import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FreelancerProfileModule } from './freelancer-profile/freelancer-profile.module';
import { SkillModule } from './skill/skill.module';
import { FreelancerSkillModule } from './freelancer-skill/freelancer-skill.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    UserModule,
    FreelancerProfileModule,
    SkillModule,
    FreelancerSkillModule,
    PortfolioModule,
    JobModule,
    ApplicationModule,
    HealthModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
