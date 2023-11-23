import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  userName: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}

export class ForgotPassword {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  userName: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  confirmPassword: string;
}
