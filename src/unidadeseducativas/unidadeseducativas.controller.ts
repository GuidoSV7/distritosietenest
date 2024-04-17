import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UnidadeseducativasService } from './unidadeseducativas.service';
import { CreateUnidadeseducativaDto } from './dto/create-unidadeseducativa.dto';
import { UpdateUnidadeseducativaDto } from './dto/update-unidadeseducativa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('unidadeseducativas')
export class UnidadeseducativasController {
  constructor(private readonly unidadeseducativasService: UnidadeseducativasService) {}

  @Post()
  create(@Body() createUnidadeseducativaDto: CreateUnidadeseducativaDto) {
    return this.unidadeseducativasService.create(createUnidadeseducativaDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.unidadeseducativasService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.unidadeseducativasService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, 
        @Body() updateUnidadeseducativaDto: UpdateUnidadeseducativaDto) 
        {
    return this.unidadeseducativasService.update(id, updateUnidadeseducativaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.unidadeseducativasService.remove(id);
  }
}
