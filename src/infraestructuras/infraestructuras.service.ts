import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInfraestructuraDto } from './dto/create-infraestructura.dto';
import { UpdateInfraestructuraDto } from './dto/update-infraestructura.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Infraestructura } from './entities/infraestructura.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class InfraestructurasService {

  private readonly logger = new Logger('InfraestructurasService');

  constructor(

   

    @InjectRepository(Infraestructura)
    private readonly infraestructuraRepository: Repository<Infraestructura>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createInfraestructuraDto: CreateInfraestructuraDto) {
    try {
      const {...InfraestructuraDetails} = createInfraestructuraDto;
      const infraestructura = this.infraestructuraRepository.create({
        ...InfraestructuraDetails
      });

      return await this.infraestructuraRepository.save(infraestructura);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.infraestructuraRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let infraestructura: Infraestructura;

      const queryBuilder = this.infraestructuraRepository.createQueryBuilder();
      infraestructura = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!infraestructura){
      throw new NotFoundException( `Infraestructura con id ${id} no encontrada`);
    }

    return infraestructura;
    
  }

  async update(id: number, updateInfraestructuraDto: UpdateInfraestructuraDto) {

    const {...toUpdate} = updateInfraestructuraDto;

    const infraestructura = await this.infraestructuraRepository.preload({id, ...toUpdate});

    if(!infraestructura){
      throw new NotFoundException(`Infraestructura con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(infraestructura);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.infraestructuraRepository.save(infraestructura);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Infraestructura');
    }
  
    
  }




  async remove(id: number) {

    const infraestructura = await this.findOne(id);

    await this.infraestructuraRepository.remove(infraestructura);

    return { mensaje: `La infraestructura con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllInfraestructuras(){
    const query = this.infraestructuraRepository.createQueryBuilder('infraestructura');

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
