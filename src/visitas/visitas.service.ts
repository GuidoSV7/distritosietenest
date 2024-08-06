import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Visita } from './entities/visita.entity';

@Injectable()
export class VisitasService {
  private readonly logger = new Logger('VisitasService');

  constructor(

   

    @InjectRepository(Visita)
    private readonly visitaRepository: Repository<Visita>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createVisitaDto: CreateVisitaDto) {
    try {
      const {idUnidadEducativa,...VisitaDetails} = createVisitaDto;
      const visita = this.visitaRepository.create({
        ...VisitaDetails,
        unidadeducativa: { id: idUnidadEducativa }
      });

      return await this.visitaRepository.save(visita);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.visitaRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let visita: Visita;

      const queryBuilder = this.visitaRepository.createQueryBuilder();
      visita = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!visita){
      throw new NotFoundException( `Visita con id ${id} no encontrada`);
    }

    return visita;
    
  }

  async update(id: number, updateVisitaDto: UpdateVisitaDto) {

    const {idUnidadEducativa,...toUpdate} = updateVisitaDto;

    const visita = await this.visitaRepository.preload({id, 
      ...toUpdate,
      unidadeducativa: { id: idUnidadEducativa }
    
    });

    if(!visita){
      throw new NotFoundException(`Visita con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(visita);

      await queryRunner.commitTransaction();
      await queryRunner.release();

     
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Visita');
    }
  
    
  }




  async remove(id: number) {

    const visita = await this.findOne(id);

    await this.visitaRepository.remove(visita);

    return { mensaje: `La visita con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllVisitas(){
    const query = this.visitaRepository.createQueryBuilder('visita');

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
