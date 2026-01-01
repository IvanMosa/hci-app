import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto, UserLoginDto } from './auth.dto';

interface JwtResponseDto {
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async userPasswordLogin(
    @Body() { email, password }: UserLoginDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegistrationDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.userRegister(registerDto);
  }
}
