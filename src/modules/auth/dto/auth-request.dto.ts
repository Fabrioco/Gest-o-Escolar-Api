import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto {
  @ApiProperty({ example: 'test@example.com' })
  email: string;
  @ApiProperty({ example: '12345678' })
  password: string;
}
