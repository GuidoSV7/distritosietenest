import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OficinadistritalService } from './oficinadistrital.service';
import { UpdateOficinadistritalDto } from './dto/update-oficinadistrital.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('oficinadistrital')
export class OficinadistritalController {
  constructor(private readonly oficinadistritalService: OficinadistritalService) {}



  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.oficinadistritalService.findAll(paginationDto);
  }


  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateoficinaDistritalDto: UpdateOficinadistritalDto) 
        {
    return this.oficinadistritalService.update(id, updateoficinaDistritalDto);
  }


}
