import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post('category')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put('category/:categoryId')
  update(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(categoryId, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('category/:categoryId')
  remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.remove(categoryId);
  }
}
