import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentrospolicialesService } from './centrospoliciales.service';
import { CreateCentrospolicialeDto } from './dto/create-centrospoliciale.dto';
import { UpdateCentrospolicialeDto } from './dto/update-centrospoliciale.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Centrospoliciale } from './entities/centrospoliciale.entity';

@ApiTags('Policiales')
@Controller('centrospoliciales')
export class CentrospolicialesController {
  constructor(private readonly centrospolicialesService: CentrospolicialesService) {}

  @Post()
  @ApiResponse({status:201, description:'Centrospoliciale Creado exitosamente', type: Centrospoliciale})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCentrospolicialeDto: CreateCentrospolicialeDto) {
    return this.centrospolicialesService.create(createCentrospolicialeDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.centrospolicialesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centrospolicialesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCentrospolicialeDto: UpdateCentrospolicialeDto) 
        {
    return this.centrospolicialesService.update(id, updateCentrospolicialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centrospolicialesService.remove(id);
  }
}
