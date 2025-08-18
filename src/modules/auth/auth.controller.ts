import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginRequestDto } from './dto/auth-request.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    summary: 'User Login',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.service.login(loginDto);
  }
}
