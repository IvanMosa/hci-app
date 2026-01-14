import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { FreelancerProfileService } from './freelancer-profile.service';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Freelancer Profile')
@Controller('freelancer-profile')
export class FreelancerProfileController {
  constructor(
    private readonly freelancerProfileService: FreelancerProfileService,
  ) {}

  // @Post()
  // create(@Body() createFreelancerProfileDto: CreateFreelancerProfileDto) {
  //   return this.freelancerProfileService.create(createFreelancerProfileDto);
  // }

  @Get()
  findAll() {
    return this.freelancerProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFreelancerProfileDto: UpdateFreelancerProfileDto,
  ) {
    return this.freelancerProfileService.update(id, updateFreelancerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freelancerProfileService.remove(id);
  }
}
