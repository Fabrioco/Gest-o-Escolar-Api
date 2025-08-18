import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenHelper {
  generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
  }

  verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token', error as ErrorOptions);
    }
  }
}
