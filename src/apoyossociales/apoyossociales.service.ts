import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateApoyossocialeDto } from './dto/create-apoyossociale.dto';
import { UpdateApoyossocialeDto } from './dto/update-apoyossociale.dto';
import { Apoyossociale } from './entities/apoyossociale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ApoyossocialesService {
  private readonly logger = new Logger('ApoyossocialesService');
  

  constructor(

   

    @InjectRepository(Apoyossociale)
    private readonly apoyosocialeRepository: Repository<Apoyossociale>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createApoyossocialeDto: CreateApoyossocialeDto) {
    try {
      const {idUnidadEducativa, ...ApoyosocialeDetails} = createApoyossocialeDto;
      const apoyosociale = this.apoyosocialeRepository.create({
        ...ApoyosocialeDetails,
        unidadeducativa: { id: idUnidadEducativa }
      });

      return await this.apoyosocialeRepository.save(apoyosociale);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.apoyosocialeRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let apoyosociale: Apoyossociale;

      const queryBuilder = this.apoyosocialeRepository.createQueryBuilder();
      apoyosociale = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!apoyosociale){
      throw new NotFoundException( `Apoyosociale con id ${id} no encontrada`);
    }

    return apoyosociale;
    
  }

  async update(id: number, updateApoyossocialeDto: UpdateApoyossocialeDto) {

    const {...toUpdate} = updateApoyossocialeDto;

    const apoyosociale = await this.apoyosocialeRepository.preload({id, ...toUpdate});

    if(!apoyosociale){
      throw new NotFoundException(`Apoyosociale con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(apoyosociale);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.apoyosocialeRepository.save(apoyosociale);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Apoyosociale');
    }
  
    
  }




  async remove(id: number) {

    const apoyosociale = await this.findOne(id);

    await this.apoyosocialeRepository.remove(apoyosociale);

    return { mensaje: `La apoyosociale con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllApoyosociales(){
    const query = this.apoyosocialeRepository.createQueryBuilder('apoyosociale');

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
