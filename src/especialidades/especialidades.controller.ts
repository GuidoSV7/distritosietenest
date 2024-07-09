import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Especialidade } from './entities/especialidade.entity';
@ApiTags('Especialidades')
@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}
  @Post()
  @ApiResponse({status:201, description:'Especialidade Creado exitosamente', type: Especialidade})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadesService.create(createEspecialidadeDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.especialidadesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.especialidadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateEspecialidadeDto: UpdateEspecialidadeDto) 
        {
    return this.especialidadesService.update(id, updateEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.especialidadesService.remove(id);
  }
}
