import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FreelancerGuard extends AuthGuard('freelancer') {}
