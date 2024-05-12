import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipocolegioDto } from './dto/create-tipocolegio.dto';
import { UpdateTipocolegioDto } from './dto/update-tipocolegio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipocolegio } from './entities/tipocolegio.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TipocolegiosService {

  private readonly logger = new Logger('TipocolegiosService');
  

  constructor(

   

    @InjectRepository(Tipocolegio)
    private readonly tipocolegioRepository: Repository<Tipocolegio>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createTipocolegioDto: CreateTipocolegioDto) {
    try {
      const {...TipocolegioDetails} = createTipocolegioDto;
      const tipocolegio = this.tipocolegioRepository.create({
        ...TipocolegioDetails
      });

      return await this.tipocolegioRepository.save(tipocolegio);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.tipocolegioRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let tipocolegio: Tipocolegio;

      const queryBuilder = this.tipocolegioRepository.createQueryBuilder();
      tipocolegio = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!tipocolegio){
      throw new NotFoundException( `Tipocolegio con id ${id} no encontrada`);
    }

    return tipocolegio;
    
  }

  async update(id: number, updateTipocolegioDto: UpdateTipocolegioDto) {

    const {...toUpdate} = updateTipocolegioDto;

    const tipocolegio = await this.tipocolegioRepository.preload({id, ...toUpdate});

    if(!tipocolegio){
      throw new NotFoundException(`Tipocolegio con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(tipocolegio);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.tipocolegioRepository.save(tipocolegio);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Tipocolegio');
    }
  
    
  }




  async remove(id: number) {

    const tipocolegio = await this.findOne(id);

    await this.tipocolegioRepository.remove(tipocolegio);

    return { mensaje: `La tipocolegio con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllTipocolegios(){
    const query = this.tipocolegioRepository.createQueryBuilder('tipocolegio');

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
