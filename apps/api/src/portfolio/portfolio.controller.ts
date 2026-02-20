import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  create(@Body() createPortfolioDto: CreatePortfolioDto, @Req() req: any) {
    createPortfolioDto.freelancerId = req.user.id;
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @Req() req: any,
  ) {
    const portfolio = await this.portfolioService.findOne(id);
    if (portfolio?.freelancerId !== req.user.id) {
      throw new ForbiddenException('You can only update your own portfolio');
    }
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    const portfolio = await this.portfolioService.findOne(id);
    if (portfolio?.freelancerId !== req.user.id) {
      throw new ForbiddenException('You can only delete your own portfolio');
    }
    return this.portfolioService.remove(id);
  }
}
