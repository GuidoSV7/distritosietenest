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
  async findOne(id : number) {

    let oficinaDistrital: Oficinadistrital;

      const queryBuilder = this.oficinaDistritalRepository.createQueryBuilder();
      oficinaDistrital = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!oficinaDistrital){
      throw new NotFoundException( `OficinaDistrital con id ${id} no encontrada`);
    }

    return oficinaDistrital;
    
  }

  async update(id: number, updateOficinaDistritalDto: UpdateOficinadistritalDto) {

    const {...toUpdate} = updateOficinaDistritalDto;

    const oficinaDistrital = await this.oficinaDistritalRepository.preload({id, 
      ...toUpdate, 
    });

    if(!oficinaDistrital){
      throw new NotFoundException(`OficinaDistrital con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      await queryRunner.manager.save(oficinaDistrital);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.oficinaDistritalRepository.save(oficinaDistrital);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la OficinaDistrital');
    }
  
    
  }


}
