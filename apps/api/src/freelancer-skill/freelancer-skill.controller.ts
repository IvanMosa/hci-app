import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Freelancer Skill')
@Controller('freelancer-skill')
export class FreelancerSkillController {
  constructor(
    private readonly freelancerSkillService: FreelancerSkillService,
  ) {}

  // @Post()
  // create(@Body() createFreelancerSkillDto: CreateFreelancerSkillDto) {
  //   return this.freelancerSkillService.create(createFreelancerSkillDto);
  // }

  @Get()
  findAll() {
    return this.freelancerSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerSkillService.findSkillsByFreelancerId(id);
  }
}
