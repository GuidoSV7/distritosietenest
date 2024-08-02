import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MantenimientosService {
  private readonly logger = new Logger('MantenimientosService');

  constructor(

   

    @InjectRepository(Mantenimiento)
    private readonly mantenimientoRepository: Repository<Mantenimiento>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createMantenimientoDto: CreateMantenimientoDto) {
    try {
      const {idUnidadEducativa,...MantenimientoDetails} = createMantenimientoDto;
      const mantenimiento = this.mantenimientoRepository.create({
        ...MantenimientoDetails,
        unidadeducativa: { id: idUnidadEducativa }
      });

      return await this.mantenimientoRepository.save(mantenimiento);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.mantenimientoRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let mantenimiento: Mantenimiento;

      const queryBuilder = this.mantenimientoRepository.createQueryBuilder();
      mantenimiento = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!mantenimiento){
      throw new NotFoundException( `Mantenimiento con id ${id} no encontrada`);
    }

    return mantenimiento;
    
  }

  async update(id: number, updateMantenimientoDto: UpdateMantenimientoDto) {

    const {idUnidadEducativa,...toUpdate} = updateMantenimientoDto;

    const mantenimiento = await this.mantenimientoRepository.preload({id, 
      ...toUpdate,
      unidadeducativa: { id: idUnidadEducativa }
    
    });

    if(!mantenimiento){
      throw new NotFoundException(`Mantenimiento con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(mantenimiento);

      await queryRunner.commitTransaction();
      await queryRunner.release();

     
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Mantenimiento');
    }
  
    
  }




  async remove(id: number) {

    const mantenimiento = await this.findOne(id);

    await this.mantenimientoRepository.remove(mantenimiento);

    return { mensaje: `La mantenimiento con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllMantenimientos(){
    const query = this.mantenimientoRepository.createQueryBuilder('mantenimiento');

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
