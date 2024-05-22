import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Turno } from './entities/turno.entity';

@ApiTags('Turnos')

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  @ApiResponse({status:201, description:'Turno Creado exitosamente', type: Turno})
  @ApiResponse({status:400, description:'Bad Request'})
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
