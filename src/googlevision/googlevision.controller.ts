import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GooglevisionService } from './googlevision.service';
import { SearchLabelsDto } from './dto/seach-labels.dto';

@Controller('googlevision')
export class GooglevisionController {
  constructor(private readonly googlevisionService: GooglevisionService) {}

  @Post('detect-labels')
  async detectLabels(@Body() searchLabelsDto: SearchLabelsDto ) {
    return this.googlevisionService.detectLabels(searchLabelsDto);
  }

}
