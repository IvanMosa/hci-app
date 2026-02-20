import { Module, Global } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UploadController } from './upload.controller';
import { PrismaService } from 'src/prisma.service';

@Global()
@Module({
  controllers: [UploadController],
  providers: [CloudinaryService, PrismaService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
