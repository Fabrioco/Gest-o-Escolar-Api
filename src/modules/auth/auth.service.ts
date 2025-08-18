import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { PasswordHelper } from './strategies/password.strategies';
import { TokenHelper } from './strategies/token.strategies';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly tokenHelper: TokenHelper,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.repository.findUserByEmail(loginDto.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.passwordHelper.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, id: user.id, Role: user.role };

    const token = this.tokenHelper.generateToken(payload);

    if (!token) {
      throw new Error('Error generating token');
    }

    return {
      token,
      user: {
        email: user.email,
        id: user.id,
        role: user.role,
      },
    };
  }
}
