import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class EspecialidadesService {
  private readonly logger = new Logger('EspecialidadesService');
  

  constructor(

   

    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,


    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createEspecialidadeDto: CreateEspecialidadeDto) {
    try {
      const {...EspecialidadeDetails} = createEspecialidadeDto;
      const turno = this.especialidadeRepository.create({
        ...EspecialidadeDetails       
      });


      return await this.especialidadeRepository.save(turno);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.especialidadeRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let turno: Especialidade;

      const queryBuilder = this.especialidadeRepository.createQueryBuilder();
      turno = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!turno){
      throw new NotFoundException( `Especialidade con id ${id} no encontrada`);
    }

    return turno;
    
  }

  async update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {

    const {...toUpdate} = updateEspecialidadeDto;

    const turno = await this.especialidadeRepository.preload({id, ...toUpdate});

    if(!turno){
      throw new NotFoundException(`Especialidade con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(turno);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.especialidadeRepository.save(turno);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Especialidade');
    }
  
    
  }




  async remove(id: number) {

    const turno = await this.findOne(id);

    await this.especialidadeRepository.remove(turno);

    return { mensaje: `La turno con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllEspecialidades(){
    const query = this.especialidadeRepository.createQueryBuilder('turno');

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
