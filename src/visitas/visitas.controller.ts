import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Visita } from './entities/visita.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('visitas')
@ApiTags('Visitas')
export class VisitasController {
  constructor(private readonly visitasService: VisitasService) {}

  @Post()
  @ApiResponse({status:201, description:'Visita Creado exitosamente', type: Visita})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createVisitaDto: CreateVisitaDto) {
    return this.visitasService.create(createVisitaDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.visitasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.visitasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateVisitaDto: UpdateVisitaDto) 
        {
    return this.visitasService.update(id, updateVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.visitasService.remove(id);
  }
}
