import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';
import { UpdateFreelancerSkillDto } from './dto/update-freelancer-skill.dto';

@Controller('freelancer-skill')
export class FreelancerSkillController {
  constructor(private readonly freelancerSkillService: FreelancerSkillService) {}

  @Post()
  create(@Body() createFreelancerSkillDto: CreateFreelancerSkillDto) {
    return this.freelancerSkillService.create(createFreelancerSkillDto);
  }

  @Get()
  findAll() {
    return this.freelancerSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFreelancerSkillDto: UpdateFreelancerSkillDto) {
    return this.freelancerSkillService.update(+id, updateFreelancerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freelancerSkillService.remove(+id);
  }
}
