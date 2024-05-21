import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DesayunosService } from './desayunos.service';
import { CreateDesayunoDto } from './dto/create-desayuno.dto';
import { UpdateDesayunoDto } from './dto/update-desayuno.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('desayunos')
export class DesayunosController {
  constructor(private readonly desayunosService: DesayunosService) {}

  @Post()
  create(@Body() createDesayunoDto: CreateDesayunoDto) {
    return this.desayunosService.create(createDesayunoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.desayunosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.desayunosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateDesayunoDto: UpdateDesayunoDto) 
        {
    return this.desayunosService.update(id, updateDesayunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.desayunosService.remove(id);
  }
}
