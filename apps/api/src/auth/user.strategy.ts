import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type UserJwtPayload = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user';
};

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  validate(payload: UserJwtPayload): UserJwtPayload {
    return payload;
  }
}
