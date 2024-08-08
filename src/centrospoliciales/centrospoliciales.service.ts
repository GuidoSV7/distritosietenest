import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCentrospolicialeDto } from './dto/create-centrospoliciale.dto';
import { UpdateCentrospolicialeDto } from './dto/update-centrospoliciale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Centrospoliciale } from './entities/centrospoliciale.entity';

@Injectable()
export class CentrospolicialesService {
  private readonly logger = new Logger('CentrospolicialesService');
  

  constructor(

   

    @InjectRepository(Centrospoliciale)
    private readonly centrospolicialRepository: Repository<Centrospoliciale>,
    

    private readonly dataSource: DataSource,
  ){}


  async create(createCentrospolicialDto: CreateCentrospolicialeDto) {
    try {
      const {...CentrospolicialDetails} = createCentrospolicialDto;
      
      const centrospolicial = this.centrospolicialRepository.create({
        ...CentrospolicialDetails
        
      });

      return await this.centrospolicialRepository.save(centrospolicial);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.centrospolicialRepository.find({
      take: limit,
      skip: offset,
      relations: {
      

      }
    });
    
  }

  async findOne(id : number) {

    let centrospolicial: Centrospoliciale;

      const queryBuilder = this.centrospolicialRepository.createQueryBuilder('centrospolicial');
      centrospolicial = await queryBuilder
        .where('centrospolicial.id =:id ',{
          id:id,
          
        })
        .getOne();

    if(!centrospolicial){
      throw new NotFoundException( `Centrospolicial con id ${id} no encontrada`);
    }

    return centrospolicial;
    
  }

  async update(id: number, updateCentrospolicialDto: UpdateCentrospolicialeDto) {

    const { ...toUpdate} = updateCentrospolicialDto;

    const centrospolicial = await this.centrospolicialRepository.preload({id, ...toUpdate});

    if(!centrospolicial){
      throw new NotFoundException(`Centrospolicial con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(centrospolicial);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.centrospolicialRepository.save(centrospolicial);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Centrospolicial');
    }
  
    
  }




  async remove(id: number) {

    const centrospolicial = await this.findOne(id);

    await this.centrospolicialRepository.remove(centrospolicial);

    return { mensaje: `La centrospolicial con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCentrospoliciales(){
    const query = this.centrospolicialRepository.createQueryBuilder('centrospolicial');

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
