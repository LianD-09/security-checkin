import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserLocationDto } from './dto/user_location.dto';
import { UserLocationService } from './user_location.service';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';

@Controller('user-location')
@ApiTags('user-location')
export class UserLocationController {
  constructor(
    private readonly userLocationService: UserLocationService,
    private readonly locationService: LocationService,
    private readonly userService: UserService,
  ) { }

  @Post()
  async create(@Body() dto: CreateUserLocationDto) {
    try {
      const { userId, locationId } = dto;
      const location = await this.locationService.findOne(locationId);
      const userAssigned = await this.userService.findOne(userId);

      if (!location && !userAssigned) {
        return await this.userLocationService.create(dto);
      }

      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Security has been already assigned to this location',
      },
        HttpStatus.BAD_REQUEST
      )
    }
    catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userLocationService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userLocationService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userLocationService.delete(id);
  }
}
