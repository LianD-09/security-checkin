import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserLocationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  locationId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  assignedBy: number;
}
