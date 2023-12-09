import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserLocationDto } from './dto/user_location.dto';
@Injectable()
export class UserLocationService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(id: number) {
    return await this.prismaService.user_Location.findFirst({ where: { id } });
  }

  async findBy(userId?: number, locationId?: number, assignedBy?: number) {
    return await this.prismaService.user_Location.findMany({
      where: {
        userId: userId,
        locationId: locationId,
        assignedBy: assignedBy
      },
    });
  }

  async findAll() {
    return await this.prismaService.user_Location.findMany();
  }

  async create(dto: UserLocationDto) {
    return await this.prismaService.user_Location.create({ data: dto });
  }

  async delete(id: number) {
    return await this.prismaService.user_Location.delete({ where: { id } });
  }
}
