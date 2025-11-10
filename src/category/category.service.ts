import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { services: true },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { services: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto,
      },
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category.services.length > 0) {
      throw new BadRequestException('Cannot delete category with services');
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
