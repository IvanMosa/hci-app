import { Body, Controller, Post } from '@nestjs/common';
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
  async userPasswordLogin(
    @Body() { email, password }: UserLoginDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.login(email, password);
  }

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
  async register(
    @Body() registerDto: RegistrationDto,
  ): Promise<JwtResponseDto> {
    return await this.authService.userRegister(registerDto);
  }
}
