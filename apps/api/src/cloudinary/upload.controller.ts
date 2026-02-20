import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  BadRequestException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { UserGuard } from 'src/auth/user.guard';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('profile-image/:userId')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadProfileImage(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (req.user.id !== userId) {
      throw new ForbiddenException(
        'You can only upload your own profile image',
      );
    }

    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const result = await this.cloudinaryService.uploadImage(
      file,
      'freelancia/profiles',
    );

    const updated = await this.prisma.freelancerProfile.upsert({
      where: { userId: userId },
      update: { imageUrl: result.secure_url },
      create: { userId: userId, imageUrl: result.secure_url },
    });

    return { imageUrl: updated.imageUrl };
  }

  @Post('portfolio-image/:portfolioId')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadPortfolioImage(
    @Param('portfolioId') portfolioId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });
    if (portfolio?.freelancerId !== req.user.id) {
      throw new ForbiddenException(
        'You can only upload images to your own portfolio',
      );
    }

    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const result = await this.cloudinaryService.uploadImage(
      file,
      'freelancia/portfolio',
    );

    const updated = await this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: { imageUrl: result.secure_url },
    });

    return { imageUrl: updated.imageUrl };
  }

  @Post('job-image/:jobId')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadJobImage(
    @Param('jobId') jobId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });
    if (job?.clientId !== req.user.id) {
      throw new ForbiddenException(
        'You can only upload images to your own jobs',
      );
    }

    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const result = await this.cloudinaryService.uploadImage(
      file,
      'freelancia/jobs',
    );

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: { imageUrl: result.secure_url },
    });

    return { imageUrl: updated.imageUrl };
  }
}
