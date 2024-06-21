import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCentrosturisticoDto } from './dto/create-centrosturistico.dto';
import { UpdateCentrosturisticoDto } from './dto/update-centrosturistico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CentrosTuristico } from './entities/centrosturistico.entity';
import { CentrosTuristicoFoto } from './entities/centroturistico-foto.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CentrosturisticosService {
  private readonly logger = new Logger('CentrosturisticosService');

  constructor(

   

    @InjectRepository(CentrosTuristico)
    private readonly centrosturisticoRepository: Repository<CentrosTuristico>,
    
    @InjectRepository(CentrosTuristicoFoto)
    private readonly centrosturisticoFotoRepository: Repository<CentrosTuristicoFoto>,


    private readonly dataSource: DataSource,
  ){}


  async create(createCentrosturisticoDto: CreateCentrosturisticoDto) {
    try {
      const {fotos = [] ,...CentrosturisticoDetails} = createCentrosturisticoDto;
      
      const centrosturistico = this.centrosturisticoRepository.create({
        ...CentrosturisticoDetails,
        fotos: fotos.map(foto => this.centrosturisticoFotoRepository.create({url: foto})),
      });

      return await this.centrosturisticoRepository.save(centrosturistico);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.centrosturisticoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        fotos: true,

      }
    });
    
  }

  async findOne(id : number) {

    let centrosturistico: CentrosTuristico;

      const queryBuilder = this.centrosturisticoRepository.createQueryBuilder('centrosturistico');
      centrosturistico = await queryBuilder
        .where('centrosturistico.id =:id ',{
          id:id,
          
        })
        .leftJoinAndSelect("centrosturistico.fotos", "fotos")
        .getOne();

    if(!centrosturistico){
      throw new NotFoundException( `Centrosturistico con id ${id} no encontrada`);
    }

    return centrosturistico;
    
  }

  async update(id: number, updateCentrosturisticoDto: UpdateCentrosturisticoDto) {

    const {fotos, ...toUpdate} = updateCentrosturisticoDto;

    const centrosturistico = await this.centrosturisticoRepository.preload({id, ...toUpdate});

    if(!centrosturistico){
      throw new NotFoundException(`Centrosturistico con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      if(fotos){
        await queryRunner.manager.delete(CentrosTuristicoFoto, {centrosturistico: {id}});
        
        centrosturistico.fotos = fotos.map(foto => this.centrosturisticoFotoRepository.create({url: foto}));
      }



      await queryRunner.manager.save(centrosturistico);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.centrosturisticoRepository.save(centrosturistico);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Centrosturistico');
    }
  
    
  }




  async remove(id: number) {

    const centrosturistico = await this.findOne(id);

    await this.centrosturisticoRepository.remove(centrosturistico);

    return { mensaje: `La centrosturistico con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCentrosturisticos(){
    const query = this.centrosturisticoRepository.createQueryBuilder('centrosturistico');

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
