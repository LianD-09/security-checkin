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

  @ApiProperty()
  note?: string;
}

export class ChangeStatusCheckinDto {
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
  })
  status: Status;
}