import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  Query,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { JobService } from './job.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';
import { CreateJobDto } from './dto/create-job.dto';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll(@Query('skip') skip: string, @Query('take') take: string) {
    return this.jobService.findAll(parseInt(skip), parseInt(take));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: any,
  ) {
    const job = await this.jobService.findOne(id);
    if (job?.clientId !== req.user.id) {
      throw new ForbiddenException('You can only update your own jobs');
    }
    return this.jobService.updateStatus(id, status);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: any,
  ) {
    const job = await this.jobService.findOne(id);
    if (job?.clientId !== req.user.id) {
      throw new ForbiddenException('You can only update your own jobs');
    }
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    const job = await this.jobService.findOne(id);
    if (job?.clientId !== req.user.id) {
      throw new ForbiddenException('You can only delete your own jobs');
    }
    return this.jobService.remove(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async create(@Body() createJobDto: CreateJobDto, @Req() req: any) {
    createJobDto.clientId = req.user.id;
    return this.jobService.create(createJobDto);
  }

  @Get('client/:clientId')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
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
