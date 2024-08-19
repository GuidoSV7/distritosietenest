import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { UpdateOficinadistritalDto } from './dto/update-oficinadistrital.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Oficinadistrital } from './entities/oficinadistrital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OficinadistritalService {
  private readonly logger = new Logger('OficinadistritalService');

  constructor(

   

    @InjectRepository(Oficinadistrital)
    private readonly oficinaDistritalRepository: Repository<Oficinadistrital>,
    
    
    private readonly dataSource: DataSource,
  ){}

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.oficinaDistritalRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(): Promise<Oficinadistrital> {
    let oficinaDistrital = await this.oficinaDistritalRepository.find({
      take: 1,
    }).then(results => results[0]);

    if (!oficinaDistrital) {
      oficinaDistrital = this.oficinaDistritalRepository.create({
        encargado: 'Default Encargado',
        coordenada_x: 0,
        coordenada_y: 0,
        direccion: 'Default Dirección',
        fotoUrl: '',
        numeroTelefono: 34636,
        serviciosPublicos: [],
      });
      await this.oficinaDistritalRepository.save(oficinaDistrital);
    }
    return oficinaDistrital;
  }

  async update(p0: number, updateOficinadistritalDto: UpdateOficinadistritalDto): Promise<Oficinadistrital> {
    let oficina = await this.oficinaDistritalRepository.find({
      take: 1,
    }).then(results => results[0]);
    if (!oficina) {
      oficina = this.oficinaDistritalRepository.create(updateOficinadistritalDto);
    } else {
      Object.assign(oficina, updateOficinadistritalDto);
    }
    return this.oficinaDistritalRepository.save(oficina);
  }
  
    
 }




