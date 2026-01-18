import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FreelancerProfileService } from './freelancer-profile.service';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';
import { FreelancerGuard } from 'src/auth/freelancer.guard';
import { AdminGuard } from 'src/auth/admin.guard';

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
  findAll(@Query('skip') skip: string, @Query('take') take: string) {
    return this.freelancerProfileService.findAll(+skip || 0, +take || 12);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.freelancerProfileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(FreelancerGuard)
  update(
    @Param('id') id: string,
    @Body() updateFreelancerProfileDto: UpdateFreelancerProfileDto,
  ) {
    return this.freelancerProfileService.update(id, updateFreelancerProfileDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.freelancerProfileService.remove(id);
  }

  @Get('profile/:id')
  findMyProfile(@Param('id') id: string) {
    return this.freelancerProfileService.findByUserId(id);
  }
}
