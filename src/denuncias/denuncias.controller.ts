import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Denuncia } from './entities/denuncia.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Denuncias')
@Controller('denuncias')
export class DenunciasController {
  constructor(private readonly denunciasService: DenunciasService) {}


  @Post()
  @ApiResponse({status:201, description:'Denuncia Creado exitosamente', type: Denuncia})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createDenunciaDto: CreateDenunciaDto) {
    return this.denunciasService.create(createDenunciaDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.denunciasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.denunciasService.findOne(id);
  }

}
