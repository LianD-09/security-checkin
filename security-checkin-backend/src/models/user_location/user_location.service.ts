import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserLocationDto } from './dto/user_location.dto';
@Injectable()
export class UserLocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    return await this.prismaService.user_Location.findFirst({ where: { id } });
  }

  async findByUser(userId: number) {
    return await this.prismaService.user_Location.findMany({
      where: { userId },
    });
  }

  async findByLocation(locationId: number) {
    return await this.prismaService.user_Location.findMany({
      where: { locationId },
    });
  }

  async findAll() {
    return await this.prismaService.user_Location.findMany();
  }

  async create(dto: CreateUserLocationDto) {
    return await this.prismaService.user_Location.create({ data: dto });
  }

  async delete(id: number) {
    return await this.prismaService.user_Location.delete({ where: { id } });
  }
}
