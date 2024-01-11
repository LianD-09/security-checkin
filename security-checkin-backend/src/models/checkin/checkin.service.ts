import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckinDto, ChangeStatusCheckinDto } from './dto/checkin.dto';
import { Status } from '@prisma/client';

@Injectable()
export class CheckinService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(id: number) {
    return await this.prismaService.checkin.findFirst({ where: { id } });
  }

  async findAll() {
    return await this.prismaService.checkin.findMany({
      include: {
        user: {
          select: {
            userName: true
          }
        },
        location: {
          select: {
            name: true
          }
        }
      }
    });
  }

  async findBy(locationId?: number, createBy?: number, status?: Status) {
    return await this.prismaService.checkin.findMany(
      {
        where: {
          locationId: locationId,
          createBy: createBy,
          status: status
        }
      }
    );
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
    return await this.prismaService.checkin.update({
      where: {
        id,
      },
      data: changeStatusCheckinDto,
    });
  }

  async delete(id: number) {
    return await this.prismaService.checkin.delete({ where: { id } });
  }
}
