import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { UserJwtStrategy } from './user.strategy';
import { UserGuard } from './user.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, PrismaService, UserGuard],
  exports: [AuthService, UserGuard],
})
export class AuthModule {}
