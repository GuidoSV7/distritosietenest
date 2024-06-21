import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentrossaludsService } from './centrossaluds.service';
import { CreateCentrossaludDto } from './dto/create-centrossalud.dto';
import { UpdateCentrossaludDto } from './dto/update-centrossalud.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CentrosSaluds } from './entities/centrossalud.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('centrossaluds')
export class CentrossaludsController {
  constructor(private readonly centrossaludsService: CentrossaludsService) {}

  @Post()
  @ApiResponse({status:201, description:'Centrossalud Creado exitosamente', type: CentrosSaluds})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCentrossaludDto: CreateCentrossaludDto) {
    return this.centrossaludsService.create(createCentrossaludDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.centrossaludsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centrossaludsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCentrossaludDto: UpdateCentrossaludDto) 
        {
    return this.centrossaludsService.update(id, updateCentrossaludDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centrossaludsService.remove(id);
  }
}
