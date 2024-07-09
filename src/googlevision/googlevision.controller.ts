import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GooglevisionService } from './googlevision.service';
import { SearchLabelsDto } from './dto/seach-labels.dto';
import { SafeSearchDto } from './dto/safeSearch.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('googlevision')
export class GooglevisionController {
  constructor(private readonly googlevisionService: GooglevisionService) {}

  @ApiExcludeEndpoint()
  @Post('detect-labels') //Saca etiquetas de la imagen
  async detectLabels(@Body() searchLabelsDto: SearchLabelsDto ) {
    return this.googlevisionService.detectLabels(searchLabelsDto);
  }

  @ApiExcludeEndpoint()
  @Post('safeSearch') //Reciba si la imagen tiene pornografía, violecioan, etc
  async safeSearch(@Body() safeSearchDto: SafeSearchDto){
    return this.googlevisionService.SafeSearch(safeSearchDto);
  }

}
