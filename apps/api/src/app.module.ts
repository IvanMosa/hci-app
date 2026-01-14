import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FreelancerProfileModule } from './skill/freelancer-profile/freelancer-profile.module';
import { FreelancerProfileModule } from './freelancer-profile/freelancer-profile.module';
import { SkillModule } from './skill/skill.module';
import { FreelancerSkillModule } from './freelancer-skill/freelancer-skill.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [UserModule, FreelancerProfileModule, SkillModule, FreelancerSkillModule, PortfolioModule, JobModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
