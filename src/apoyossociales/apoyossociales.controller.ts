import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApoyossocialesService } from './apoyossociales.service';
import { CreateApoyossocialeDto } from './dto/create-apoyossociale.dto';
import { UpdateApoyossocialeDto } from './dto/update-apoyossociale.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Apoyossociale } from './entities/apoyossociale.entity';

@ApiTags('Apoyos Sociales')

@Controller('apoyossociales')
export class ApoyossocialesController {
  constructor(private readonly apoyossocialesService: ApoyossocialesService) {}

  @Post()
  @ApiResponse({status:201, description:'Apoyos Sociales Creado exitosamente', type: Apoyossociale})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createApoyossocialeDto: CreateApoyossocialeDto) {
    return this.apoyossocialesService.create(createApoyossocialeDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.apoyossocialesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.apoyossocialesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateApoyossocialeDto: UpdateApoyossocialeDto) 
        {
    return this.apoyossocialesService.update(id, updateApoyossocialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.apoyossocialesService.remove(id);
  }
}
