import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { FreelancerGuard } from 'src/auth/freelancer.guard';
import { CreateJobDto } from './dto/create-job.dto';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(FreelancerGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(FreelancerGuard)
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get('client/:clientId')
  async getClientJobs(
    @Param('clientId') clientId: string,
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    return this.jobService.findByClient(
      clientId,
      parseInt(skip),
      parseInt(take),
    );
  }
}
