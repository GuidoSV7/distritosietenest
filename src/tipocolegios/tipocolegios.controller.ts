import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TipocolegiosService } from './tipocolegios.service';
import { CreateTipocolegioDto } from './dto/create-tipocolegio.dto';
import { UpdateTipocolegioDto } from './dto/update-tipocolegio.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tipocolegios')
export class TipocolegiosController {
  constructor(private readonly tipocolegiosService: TipocolegiosService) {}

  @Post()
  create(@Body() createTipoColegioDto: CreateTipocolegioDto) {
    return this.tipocolegiosService.create(createTipoColegioDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.tipocolegiosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipocolegiosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateTipoColegioDto: UpdateTipocolegioDto) 
        {
    return this.tipocolegiosService.update(id, updateTipoColegioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipocolegiosService.remove(id);
  }
}
