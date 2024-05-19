import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TurnosService {
  private readonly logger = new Logger('TurnosService');
  

  constructor(

   

    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createTurnoDto: CreateTurnoDto) {
    try {
      const {...TurnoDetails} = createTurnoDto;
      const turno = this.turnoRepository.create({
        ...TurnoDetails
      });

      return await this.turnoRepository.save(turno);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.turnoRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let turno: Turno;

      const queryBuilder = this.turnoRepository.createQueryBuilder();
      turno = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!turno){
      throw new NotFoundException( `Turno con id ${id} no encontrada`);
    }

    return turno;
    
  }

  async update(id: number, updateTurnoDto: UpdateTurnoDto) {

    const {...toUpdate} = updateTurnoDto;

    const turno = await this.turnoRepository.preload({id, ...toUpdate});

    if(!turno){
      throw new NotFoundException(`Turno con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(turno);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.turnoRepository.save(turno);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Turno');
    }
  
    
  }




  async remove(id: number) {

    const turno = await this.findOne(id);

    await this.turnoRepository.remove(turno);

    return { mensaje: `La turno con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllTurnos(){
    const query = this.turnoRepository.createQueryBuilder('turno');

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
