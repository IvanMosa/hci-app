import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) return false;

    const { user } = context.switchToHttp().getRequest();

    return user.type === 'ADMIN';
  }
}
