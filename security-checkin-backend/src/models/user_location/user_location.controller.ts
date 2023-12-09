import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions';
import { UserLocationDto } from './dto/user_location.dto';
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
  async create(@Body() dto: UserLocationDto) {
    try {
      const { userId, locationId } = dto;
      const location = await this.locationService.findOne(locationId);
      const userAssigned = await this.userService.findOne(userId);
      const allUserTask = await this.userLocationService.findBy(userId);

      if (location && userAssigned) {
        for (let i = 0; i < allUserTask.length; i++) {
          if (allUserTask[i].locationId === locationId) {
            throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: 'Security has been already assigned to this location',
            },
              HttpStatus.BAD_REQUEST
            )
          }
        }
        return await this.userLocationService.create(dto);
      }
      else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'User or Location not found',
        },
          HttpStatus.BAD_REQUEST
        )
      }
    }
    catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
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
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @ApiQuery({
    name: "userId",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "locationId",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "assignedBy",
    required: false,
    type: Number
  })
  @Get('filter')
  async findBy(
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
    @Query('locationId', new ParseIntPipe({ optional: true })) locationId?: number,
    @Query('assignedBy', new ParseIntPipe({ optional: true })) assignedBy?: number,
  ) {
    try {
      return await this.userLocationService.findBy(userId, locationId, assignedBy);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
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
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userLocationService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
