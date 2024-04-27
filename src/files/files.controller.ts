import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('files')
export class FilesController {
  constructor(private cloudinary: CloudinaryService) {}

  @Post('unidadeducativa')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUnidadEducativaFoto(
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const uploadedImage = await this.uploadImageToCloudinary(file);
    
    // Aquí se devuelve la URL de Cloudinary en la respuesta
    return {
      imageUrl: uploadedImage.url,
    };
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    try {
      return await this.cloudinary.uploadImage(file);
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }
}
