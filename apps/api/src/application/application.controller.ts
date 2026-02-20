import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';

@ApiBearerAuth()
@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createApplicationDto: CreateApplicationDto, @Req() req: any) {
    createApplicationDto.freelancerId = req.user.id;
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll() {
    return this.applicationService.findAll();
  }

  @Get('job/:jobId')
  @UseGuards(UserGuard)
  findByJob(@Param('jobId') jobId: string) {
    return this.applicationService.findByJob(jobId);
  }

  @Get('freelancer/:freelancerId')
  @UseGuards(UserGuard)
  async findByFreelancer(
    @Param('freelancerId') freelancerId: string,
    @Req() req: any,
  ) {
    return this.applicationService.findByFreelancerIfOwner(
      freelancerId,
      req.user.id,
    );
  }

  @Get('client/:clientId')
  @UseGuards(UserGuard)
  findByClient(@Param('clientId') clientId: string, @Req() req: any) {
    if (req.user.id !== clientId) {
      throw new ForbiddenException(
        'You can only view applications for your own jobs',
      );
    }
    return this.applicationService.findByClient(clientId);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Req() req: any,
  ) {
    return this.applicationService.updateIfOwner(
      id,
      updateApplicationDto,
      req.user.id,
    );
  }

  @Patch(':id/status')
  @UseGuards(UserGuard)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'accepted' | 'rejected',
    @Req() req: any,
  ) {
    return this.applicationService.updateStatusIfJobOwner(
      id,
      status,
      req.user.id,
    );
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    const application = await this.applicationService.findOne(id);
    if (!application) {
      throw new ForbiddenException('Application not found');
    }
    return this.applicationService.removeIfOwner(id, req.user.id);
  }
}
