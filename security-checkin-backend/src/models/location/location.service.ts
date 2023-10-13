import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    return this.prismaService.location.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.location.findMany();
  }

  async create(createLocationDto: CreateLocationDto) {
    return this.prismaService.location.create({ data: createLocationDto });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.prismaService.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });
  }

  async delete(id: number) {
    return this.prismaService.location.delete({ where: { id } });
  }
}
