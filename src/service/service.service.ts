import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
// import { PrismaService } from '../prisma.service';
// import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(categoryId: number, createServiceDto: CreateServiceDto) {
    // Verify category exists
    await this.prisma.category.findUniqueOrThrow({ where: { id: categoryId } });

    const service = await this.prisma.service.create({
      data: {
        categoryId,
        name: createServiceDto.name,
        type: createServiceDto.type,
        priceOptions: {
          create: createServiceDto.priceOptions.map((p) => ({
            duration: p.duration,
            price: p.price,
            type: p.type,
          })),
        },
      },
      include: { priceOptions: true },
    });

    return service;
  }

  async findAll(categoryId: number) {
    return this.prisma.service.findMany({
      where: { categoryId },
      include: { priceOptions: true },
    });
  }

  async findOne(categoryId: number, serviceId: number) {
    const service = await this.prisma.service.findFirst({
      where: { id: serviceId, categoryId },
      include: { priceOptions: true },
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(categoryId: number, serviceId: number, updateServiceDto: UpdateServiceDto) {
    await this.findOne(categoryId, serviceId);

    // Update service and price options
    // For price options, let's delete all old and recreate all from DTO for simplicity
    return this.prisma.$transaction(async (tx) => {
      await tx.servicePriceOption.deleteMany({ where: { serviceId } });

      return tx.service.update({
        where: { id: serviceId },
        data: {
          name: updateServiceDto.name,
          type: updateServiceDto.type,
          priceOptions: {
            create: updateServiceDto.priceOptions?.map((p) => ({
              duration: p.duration,
              price: p.price,
              type: p.type,
            })),
          },
        },
        include: { priceOptions: true },
      });
    });
  }

  async remove(categoryId: number, serviceId: number) {
    await this.findOne(categoryId, serviceId);

    return this.prisma.service.delete({ where: { id: serviceId } });
  }
}
