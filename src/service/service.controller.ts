import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('category/:categoryId')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('service')
  create(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.create(categoryId, createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('services')
  findAll(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.serviceService.findAll(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('service/:serviceId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(categoryId, serviceId, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('service/:serviceId')
  remove(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ) {
    return this.serviceService.remove(categoryId, serviceId);
  }
}