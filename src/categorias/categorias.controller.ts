import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categoria } from './entities/categoria.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Categorias')

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiResponse({status:201, description:'Categoria Creada exitosamente', type: Categoria})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.categoriasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCategoriaDto: UpdateCategoriaDto) 
        {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }
}