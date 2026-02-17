import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Freelancer Skill')
@Controller('freelancer-skill')
export class FreelancerSkillController {
  constructor(
    private readonly freelancerSkillService: FreelancerSkillService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createFreelancerSkillDto: CreateFreelancerSkillDto) {
    return this.freelancerSkillService.create(createFreelancerSkillDto);
  }

  @Get()
  findAll() {
    return this.freelancerSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerSkillService.findSkillsByFreelancerId(id);
  }

  @Delete(':freelancerId/:skillId')
  remove(
    @Param('freelancerId') freelancerId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.freelancerSkillService.remove(freelancerId, skillId);
  }
}
