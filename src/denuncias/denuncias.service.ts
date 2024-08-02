
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { Denuncia } from './entities/denuncia.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TelegramService } from 'src/telegram/telegram.service';
import { CreateMessageTelegramDto } from 'src/telegram/dto/createmessage-telegram.dto';
import { UnidadeseducativasService } from 'src/unidadeseducativas/unidadeseducativas.service';


@Injectable()
export class DenunciasService {
  private readonly logger = new Logger('DenunciasService');
  
  constructor(

   

    @InjectRepository(Denuncia)
    private readonly denunciaRepository: Repository<Denuncia>,
    
    private readonly telegramService: TelegramService,


    
    private readonly unidadeseducativaService: UnidadeseducativasService,
    
    private readonly dataSource: DataSource,
  ){}


  async create(createDenunciaDto: CreateDenunciaDto) {
    try {
      const {idUnidadEducativa, ...DenunciaDetails} = createDenunciaDto;
      const denuncia = this.denunciaRepository.create({
        ...DenunciaDetails,
        idUnidadeducativa: { id: idUnidadEducativa },

      });

    
      const datosUE = await this.unidadeseducativaService.findOne(denuncia.idUnidadeducativa.id); 

      const createMessageTelegramDto = new CreateMessageTelegramDto 
      // createMessageTelegramDto.chatId = process.env.TELEGRAM_CHAT_ID
      createMessageTelegramDto.mensaje = "Mensaje de la Denuncia: " + denuncia.texto + "\nNombre UE: "  + datosUE.nombre + "\nDireccion: " + datosUE.direccion + "\nImagen: " + denuncia.imageUrl;
      
      this.telegramService.sendMessage(createMessageTelegramDto);
      

      return await this.denunciaRepository.save(denuncia);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.denunciaRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let denuncia: Denuncia;

      const queryBuilder = this.denunciaRepository.createQueryBuilder();
      denuncia = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!denuncia){
      throw new NotFoundException( `Denuncia con id ${id} no encontrada`);
    }

    return denuncia;
    
  }
}
