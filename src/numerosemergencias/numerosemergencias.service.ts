import { Injectable, Logger } from '@nestjs/common';
import { CreateNumerosemergenciaDto } from './dto/create-numerosemergencia.dto';
import { UpdateNumerosemergenciaDto } from './dto/update-numerosemergencia.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Numerosemergencia } from './entities/numerosemergencia.entity';

@Injectable()
export class NumerosemergenciasService {
  private readonly logger = new Logger('NumerosemergenciasService');

  constructor(

   

    @InjectRepository(Numerosemergencia)
    private readonly numerosemergenciaRepository: Repository<Numerosemergencia>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createNumerosemergenciaDto: CreateNumerosemergenciaDto) {
    try {
      const {...NumerosemergenciaDetails} = createNumerosemergenciaDto;
      const numerosemergencia = this.numerosemergenciaRepository.create({
        ...NumerosemergenciaDetails
      });

      return await this.numerosemergenciaRepository.save(numerosemergencia);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.numerosemergenciaRepository.find({
      take: limit,
      skip: offset
    });
    
  }

}
