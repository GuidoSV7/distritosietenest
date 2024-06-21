import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCentrosdeportivoDto } from './dto/create-centrosdeportivo.dto';
import { UpdateCentrosdeportivoDto } from './dto/update-centrosdeportivo.dto';
import { CentrosDeportivos } from './entities/centrosdeportivo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CentrosDeportivoFoto } from './entities/centrosdeportivo-foto.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CentrosdeportivosService {
  private readonly logger = new Logger('CentrosdeportivosService');
  

  constructor(

   

    @InjectRepository(CentrosDeportivos)
    private readonly centrosdeportivoRepository: Repository<CentrosDeportivos>,
    
    @InjectRepository(CentrosDeportivoFoto)
    private readonly centrosdeportivoFotoRepository: Repository<CentrosDeportivoFoto>,


    private readonly dataSource: DataSource,
  ){}


  async create(createCentrosdeportivoDto: CreateCentrosdeportivoDto) {
    try {
      const {fotos = [] ,...CentrosdeportivoDetails} = createCentrosdeportivoDto;
      
      const centrosdeportivo = this.centrosdeportivoRepository.create({
        ...CentrosdeportivoDetails,
        fotos: fotos.map(foto => this.centrosdeportivoFotoRepository.create({url: foto})),
      });

      return await this.centrosdeportivoRepository.save(centrosdeportivo);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.centrosdeportivoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        fotos: true,

      }
    });
    
  }

  async findOne(id : number) {

    let centrosdeportivo: CentrosDeportivos;

      const queryBuilder = this.centrosdeportivoRepository.createQueryBuilder('centrosdeportivo');
      centrosdeportivo = await queryBuilder
        .where('centrosdeportivo.id =:id ',{
          id:id,
          
        })
        .leftJoinAndSelect("centrosdeportivo.fotos", "fotos")
        .getOne();

    if(!centrosdeportivo){
      throw new NotFoundException( `Centrosdeportivo con id ${id} no encontrada`);
    }

    return centrosdeportivo;
    
  }

  async update(id: number, updateCentrosdeportivoDto: UpdateCentrosdeportivoDto) {

    const {fotos, ...toUpdate} = updateCentrosdeportivoDto;

    const centrosdeportivo = await this.centrosdeportivoRepository.preload({id, ...toUpdate});

    if(!centrosdeportivo){
      throw new NotFoundException(`Centrosdeportivo con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      if(fotos){
        await queryRunner.manager.delete(CentrosDeportivoFoto, {centrosdeportivo: {id}});
        
        centrosdeportivo.fotos = fotos.map(foto => this.centrosdeportivoFotoRepository.create({url: foto}));
      }



      await queryRunner.manager.save(centrosdeportivo);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.centrosdeportivoRepository.save(centrosdeportivo);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Centrosdeportivo');
    }
  
    
  }




  async remove(id: number) {

    const centrosdeportivo = await this.findOne(id);

    await this.centrosdeportivoRepository.remove(centrosdeportivo);

    return { mensaje: `La centrosdeportivo con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCentrosdeportivos(){
    const query = this.centrosdeportivoRepository.createQueryBuilder('centrosdeportivo');

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
