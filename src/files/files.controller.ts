import { Controller, Post, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Archivos')

@Controller('files')
export class FilesController {
  constructor(private cloudinary: CloudinaryService) {}

  @Post('fotos')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadUnidadEducativaFotos(
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files were uploaded.');
    }

    const uploadedImages = await this.uploadImagesToCloudinary(files);

    // Aquí puedes devolver las URLs de Cloudinary en la respuesta
    return {
      imageUrls: uploadedImages.map(image => image.url),
    };
  }

  async uploadImagesToCloudinary(files: Array<Express.Multer.File>) {
    const uploadedImages = [];

    for (const file of files) {
      try {
        const uploadedImage = await this.cloudinary.uploadImage(file);
        uploadedImages.push(uploadedImage);
      } catch (error) {
        // Si se produce un error al subir una imagen, puedes manejarlo aquí.
        // Puedes optar por omitir la imagen que causó el error o lanzar una excepción, según tu lógica de negocio.
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    return uploadedImages;
  }
}