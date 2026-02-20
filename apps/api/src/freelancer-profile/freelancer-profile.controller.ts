import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { FreelancerProfileService } from './freelancer-profile.service';
import { UpdateFreelancerProfileDto } from './dto/update-freelancer-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('Freelancer Profile')
@Controller('freelancer-profile')
export class FreelancerProfileController {
  constructor(
    private readonly freelancerProfileService: FreelancerProfileService,
  ) {}

  @Get()
  findAll(@Query('skip') skip: string, @Query('take') take: string) {
    return this.freelancerProfileService.findAll(+skip || 0, +take || 12);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.freelancerProfileService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  update(
    @Param('id') id: string,
    @Body() updateFreelancerProfileDto: UpdateFreelancerProfileDto,
    @Req() req: any,
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.freelancerProfileService.updateByUserId(
      id,
      updateFreelancerProfileDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.freelancerProfileService.remove(id);
  }

  @Get('profile/:id')
  findMyProfile(@Param('id') id: string) {
    return this.freelancerProfileService.findByUserId(id);
  }
}
