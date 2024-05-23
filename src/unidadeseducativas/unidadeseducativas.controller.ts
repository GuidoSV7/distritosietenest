import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UnidadeseducativasService } from './unidadeseducativas.service';
import { CreateUnidadeseducativaDto } from './dto/create-unidadeseducativa.dto';
import { UpdateUnidadeseducativaDto } from './dto/update-unidadeseducativa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Unidadeseducativa } from './entities';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Unidades Educativas')
@Controller('unidadeseducativas')
export class UnidadeseducativasController {
  constructor(private readonly unidadeseducativasService: UnidadeseducativasService) {}


  @Post()
  // @Auth(ValidRoles.admin)
  @ApiResponse({status:201, description:'Unidad Educativa Creada exitosamente', type: Unidadeseducativa})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createUnidadEducativaDto: CreateUnidadeseducativaDto) {
    return this.unidadeseducativasService.create(createUnidadEducativaDto);
  }


  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.unidadeseducativasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.unidadeseducativasService.findOne(id);
  }

  // @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateUnidadEducativaDto: UpdateUnidadeseducativaDto) 
        {
    return this.unidadeseducativasService.update(id, updateUnidadEducativaDto);
  }
  
  // @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.unidadeseducativasService.remove(id);
  }
}
