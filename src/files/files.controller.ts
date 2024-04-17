import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,BadRequestException, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('unidadeducativa')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:fileFilter
  }))
  uploadUnidadEducativaFoto(
    @UploadedFile() file:Express.Multer.File
    
    ){
      
      if ( !file ) {
        throw new BadRequestException('Make sure that the file is an image');
      }

      return {
        fileName : file.originalname
      };
    
  }

 
}
