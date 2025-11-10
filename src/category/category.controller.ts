import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService. CategoryCreate(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoryService. CategoryFindAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':categoryId')
  update(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService. CategoryUpdate(categoryId, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService. CategoryRemove(categoryId);
  }
}