import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCentrossaludDto } from './dto/create-centrossalud.dto';
import { UpdateCentrossaludDto } from './dto/update-centrossalud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CentrosSaluds } from './entities/centrossaludentity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CentrosSaludFoto } from './entities/centrossalud-foto.entity';
import { CentrosSaludsEspecialidades } from './entities/centrossalud-has-especialidad.entity';

@Injectable()
export class CentrossaludsService {
  private readonly logger = new Logger('CentrossaludsService');
  

  constructor(

   

    @InjectRepository(CentrosSaluds)
    private readonly centrossaludRepository: Repository<CentrosSaluds>,
    
    @InjectRepository(CentrosSaludFoto)
    private readonly centrossaludFotoRepository: Repository<CentrosSaludFoto>,

    @InjectRepository(CentrosSaludsEspecialidades)
    private readonly centrossaludEspecialidadesRepository: Repository<CentrosSaludsEspecialidades>,

    private readonly dataSource: DataSource,
  ){}


  async create(createCentrossaludDto: CreateCentrossaludDto) {
    try {
      const {fotos = [], especialidades = [] ,...CentrossaludDetails} = createCentrossaludDto;
      
      // const centrossalud = this.centrossaludRepository.create({
      //   ...CentrossaludDetails,
      //   fotos: fotos.map(foto => this.centrossaludFotoRepository.create({url: foto})),
      //   especialidades: especialidades.map(especialidades => this.centrossaludEspecialidadesRepository.create(
      //     { centrosSaluds : centrossalud.id as CentrosSaluds,
      //       especialidade: especialidades
      //     }
      //   ))
      // });

      // return await this.centrossaludRepository.save(centrossalud);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.centrossaludRepository.find({
      take: limit,
      skip: offset,
      relations: {
        fotos: true,

      }
    });
    
  }

  async findOne(id : number) {

    let centrossalud: CentrosSaluds;

      const queryBuilder = this.centrossaludRepository.createQueryBuilder('centrossalud');
      centrossalud = await queryBuilder
        .where('centrossalud.id =:id ',{
          id:id,
          
        })
        .leftJoinAndSelect("centrossalud.fotos", "fotos")
        .getOne();

    if(!centrossalud){
      throw new NotFoundException( `Centrossalud con id ${id} no encontrada`);
    }

    return centrossalud;
    
  }

  async update(id: number, updateCentrossaludDto: UpdateCentrossaludDto) {

    const {fotos, especialidades,...toUpdate} = updateCentrossaludDto;

    const centrossalud = await this.centrossaludRepository.preload({id, ...toUpdate});

    if(!centrossalud){
      throw new NotFoundException(`Centrossalud con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      if(fotos){
        await queryRunner.manager.delete(CentrosSaludFoto, {centrossalud: {id}});
        
        centrossalud.fotos = fotos.map(foto => this.centrossaludFotoRepository.create({url: foto}));
      }



      await queryRunner.manager.save(centrossalud);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.centrossaludRepository.save(centrossalud);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Centrossalud');
    }
  
    
  }




  async remove(id: number) {

    const centrossalud = await this.findOne(id);

    await this.centrossaludRepository.remove(centrossalud);

    return { mensaje: `La centrossalud con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCentrossaluds(){
    const query = this.centrossaludRepository.createQueryBuilder('centrossalud');

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
