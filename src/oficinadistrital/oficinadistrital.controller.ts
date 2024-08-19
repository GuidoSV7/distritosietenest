import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OficinadistritalService } from './oficinadistrital.service';
import { UpdateOficinadistritalDto } from './dto/update-oficinadistrital.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Oficinadistrital } from './entities/oficinadistrital.entity';

@ApiTags('OficinaDistrital')
@Controller('oficinadistrital')
export class OficinadistritalController {
  constructor(private readonly oficinadistritalService: OficinadistritalService) {}




  @Get()
  @ApiResponse({ status: 200, description: 'La oficina distrital', type: Oficinadistrital })
  @ApiResponse({ status: 404, description: 'Oficina Distrital no encontrada' })
  findOne() {
    return this.oficinadistritalService.findOne();
  }

  @Patch()
  @ApiResponse({ status: 200, description: 'Oficina Distrital actualizada', type: Oficinadistrital })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Body() updateOficinadistritalDto: UpdateOficinadistritalDto) {
    return this.oficinadistritalService.update(1, updateOficinadistritalDto); // Asume que siempre hay una única instancia con id 1
  }

}
