import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
  constructor(private config: ConfigService) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePassword(attempt: string, hash: string): Promise<boolean> {
    return bcrypt.compare(attempt, hash);
  }
}
