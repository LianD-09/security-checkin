import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckinDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  locationId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  createBy: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  longtitude: number;
}

export class ChangeStatusCheckinDto {
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty()
  status: Status;
}
