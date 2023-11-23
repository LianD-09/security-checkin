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
import { CreateCheckinDto, ChangeStatusCheckinDto } from './dto/checkin.dto';
import { CheckinService } from './checkin.service';
import { Status } from '@prisma/client';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';
import { distance } from 'src/common/utils/common.utils';

@Controller('checkin')
@ApiTags('checkin')
export class CheckinController {
  constructor(
    private readonly checkinService: CheckinService,
    private readonly locationService: LocationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createCheckinDto: CreateCheckinDto) {
    const { locationId, createBy, longtitude, latitude } = createCheckinDto;
    let status: Status = Status.ACCEPT;
    const location = await this.locationService.findOne(locationId);
    const userCreated = await this.userService.findOne(createBy);

    if (!location || !userCreated) {
      status = Status.REJECT;
    } else if (
      distance(location.latitude, location.longtitude, latitude, longtitude) > parseFloat(process.env.ACCEPT_DISTANCE)
    ) {
      status = Status.REJECT;
    }

    return await this.checkinService.create(createCheckinDto, status);
  }

  @Get()
  async findAll() {
    try {
      return await this.checkinService.findAll();
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
      return await this.checkinService.findOne(id);
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

  @Post(':id')
  async update(
    @Body() changeStatusCheckinDto: ChangeStatusCheckinDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.checkinService.updateStatus(id, changeStatusCheckinDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.checkinService.delete(id);
  }
}
