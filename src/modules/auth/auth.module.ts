import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenHelper } from './strategies/token.strategies';
import { PasswordHelper } from './strategies/password.strategies';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../../database/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PasswordHelper, TokenHelper],
})
export class AuthModule {}
