import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegistrationDto, UserLoginDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface JwtResponseDto {
  accessToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ auth: { limit: 5, ttl: 60000 } })
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({
    status: 201,
    description: 'Successful login, returns JWT token',
    schema: {
      example: { accessToken: 'eyJhbGciOiJIUzI1NiIsIn...' },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too many login attempts' })
  async userPasswordLogin(
    @Body() { email, password }: UserLoginDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.login(email, password);
  }

  @Throttle({ auth: { limit: 3, ttl: 600000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegistrationDto })
  @ApiResponse({
    status: 201,
    description: 'Successful registration, returns JWT token',
    schema: {
      example: { accessToken: 'eyJhbGciOiJIUzI1NiIsIn...' },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 429, description: 'Too many sign-up attempts' })
  async register(
    @Body() registerDto: RegistrationDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.userRegister(registerDto);
  }
}
