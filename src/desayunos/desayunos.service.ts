import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDesayunoDto } from './dto/create-desayuno.dto';
import { UpdateDesayunoDto } from './dto/update-desayuno.dto';
import { Desayuno } from './entities/desayuno.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DesayunosService {
  private readonly logger = new Logger('DesayunosService');

  constructor(

   

    @InjectRepository(Desayuno)
    private readonly desayunoRepository: Repository<Desayuno>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createDesayunoDto: CreateDesayunoDto) {
    try {
      const {idUnidadEducativa,...DesayunoDetails} = createDesayunoDto;
      const desayuno = this.desayunoRepository.create({
        ...DesayunoDetails,
        unidadeducativa: { id: idUnidadEducativa }
      });

      return await this.desayunoRepository.save(desayuno);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.desayunoRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let desayuno: Desayuno;

      const queryBuilder = this.desayunoRepository.createQueryBuilder();
      desayuno = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!desayuno){
      throw new NotFoundException( `Desayuno con id ${id} no encontrada`);
    }

    return desayuno;
    
  }

  async update(id: number, updateDesayunoDto: UpdateDesayunoDto) {

    const {idUnidadEducativa,...toUpdate} = updateDesayunoDto;

    const desayuno = await this.desayunoRepository.preload({id,
       ...toUpdate,
       unidadeducativa: { id: idUnidadEducativa }
      
      });

    if(!desayuno){
      throw new NotFoundException(`Desayuno con id ${id} no encontrada`);
    }

    
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(desayuno);

      await queryRunner.commitTransaction();
      await queryRunner.release();


      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Desayuno');
    }
  
    
  }




  async remove(id: number) {

    const desayuno = await this.findOne(id);

    await this.desayunoRepository.remove(desayuno);

    return { mensaje: `La desayuno con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllDesayunos(){
    const query = this.desayunoRepository.createQueryBuilder('desayuno');

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
