import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { FreelancerSkillService } from './freelancer-skill.service';
import { CreateFreelancerSkillDto } from './dto/create-freelancer-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';

@ApiTags('Freelancer Skill')
@Controller('freelancer-skill')
export class FreelancerSkillController {
  constructor(
    private readonly freelancerSkillService: FreelancerSkillService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  create(
    @Body() createFreelancerSkillDto: CreateFreelancerSkillDto,
    @Req() req: any,
  ) {
    createFreelancerSkillDto.freelancerId = req.user.id;
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
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  remove(
    @Param('freelancerId') freelancerId: string,
    @Param('skillId') skillId: string,
    @Req() req: any,
  ) {
    if (req.user.id !== freelancerId) {
      throw new ForbiddenException('You can only manage your own skills');
    }
    return this.freelancerSkillService.remove(freelancerId, skillId);
  }
}
