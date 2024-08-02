import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateGestioneDto } from './dto/create-gestione.dto';
import { UpdateGestioneDto } from './dto/update-gestione.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Gestione } from './entities/gestione.entity';

@Injectable()
export class GestionesService {
  private readonly logger = new Logger('GestionesService');

  constructor(

   

    @InjectRepository(Gestione)
    private readonly gestioneRepository: Repository<Gestione>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createGestioneDto: CreateGestioneDto) {
    try {
      const {...GestioneDetails} = createGestioneDto;
      const gestione = this.gestioneRepository.create({
        ...GestioneDetails,
        
      });

      return await this.gestioneRepository.save(gestione);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.gestioneRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let gestione: Gestione;

      const queryBuilder = this.gestioneRepository.createQueryBuilder('gestione');
      gestione = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!gestione){
      throw new NotFoundException( `Gestione con id ${id} no encontrada`);
    }

    return gestione;
    
  }

  async update(id: number, updateGestioneDto: UpdateGestioneDto) {

    const {...toUpdate} = updateGestioneDto;

    const gestione = await this.gestioneRepository.preload({id, ...toUpdate});

    if(!gestione){
      throw new NotFoundException(`Gestione con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(gestione);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Gestione');
    }
  
    
  }




  async remove(id: number) {

    const gestione = await this.findOne(id);

    await this.gestioneRepository.remove(gestione);

    return { mensaje: `La gestione con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllGestiones(){
    const query = this.gestioneRepository.createQueryBuilder('gestione');

    try{
      return await query
       .delete()
       .where({})
       .execute(); 



    } catch(error){
      this.logger.error(error.message);
      return error.message;
    }
  }
}
