import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.turnosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.turnosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateTurnoDto: UpdateTurnoDto) 
        {
    return this.turnosService.update(id, updateTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.turnosService.remove(id);
  }
}
