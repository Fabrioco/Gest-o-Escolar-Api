import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'user' })
  role: string;
}

export class AuthResponseDto {
  @ApiPropertyOptional({ type: () => User })
  user: User;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}
