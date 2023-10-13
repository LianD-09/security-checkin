import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckinDto, ChangeStatusCheckinDto } from './dto/checkin.dto';
import { Status } from '@prisma/client';

@Injectable()
export class CheckinService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    return this.prismaService.checkin.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.checkin.findMany();
  }

  async create(createCheckinDto: CreateCheckinDto, status: Status) {
    const { locationId, createBy, ...rest } = createCheckinDto;
    return await this.prismaService.checkin.create({
      data: {
        ...rest,
        status,
        location: {
          connect: {
            id: locationId,
          },
        },
        user: {
          connect: {
            id: createBy,
          },
        },
      },
    });
  }

  async updateStatus(
    id: number,
    changeStatusCheckinDto: ChangeStatusCheckinDto,
  ) {
    return this.prismaService.checkin.update({
      where: {
        id,
      },
      data: changeStatusCheckinDto,
    });
  }
}
