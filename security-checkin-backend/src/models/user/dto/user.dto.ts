import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  userName: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  @ApiProperty()
  role: Roles;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  dob: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  @ApiProperty()
  dob: string;
}
