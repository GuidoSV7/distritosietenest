import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApoyosgubernamentalesService } from './apoyosgubernamentales.service';
import { CreateApoyosgubernamentaleDto } from './dto/create-apoyosgubernamentale.dto';
import { UpdateApoyosgubernamentaleDto } from './dto/update-apoyosgubernamentale.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Apoyosgubernamentale } from './entities/apoyosgubernamentale.entity';

@ApiTags('Apoyos Gubernamentales')

@Controller('apoyosgubernamentales')
export class ApoyosgubernamentalesController {
  constructor(private readonly apoyosgubernamentalesService: ApoyosgubernamentalesService) {}

 

  @Post()
  @ApiResponse({status:201, description:'Apoyo Gubernamental Creado exitosamente', type: Apoyosgubernamentale})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createApoyosgubernamentaleDto: CreateApoyosgubernamentaleDto) {
    return this.apoyosgubernamentalesService.create(createApoyosgubernamentaleDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.apoyosgubernamentalesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.apoyosgubernamentalesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateApoyosgubernamentaleDto: UpdateApoyosgubernamentaleDto) 
        {
    return this.apoyosgubernamentalesService.update(id, updateApoyosgubernamentaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.apoyosgubernamentalesService.remove(id);
  }
}
