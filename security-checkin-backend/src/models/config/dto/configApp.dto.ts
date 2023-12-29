import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateConfigDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  distance: number;
}
