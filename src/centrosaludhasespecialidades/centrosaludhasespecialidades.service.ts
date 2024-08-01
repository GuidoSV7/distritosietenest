import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCentrosaludhasespecialidadeDto } from './dto/create-centrosaludhasespecialidade.dto';
import { UpdateCentrosaludhasespecialidadeDto } from './dto/update-centrosaludhasespecialidade.dto';
import { CentroSaludHasEspecialidade } from './entities/centrosaludhasespecialidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CentrossaludsService } from 'src/centrossaluds/centrossaluds.service';
import { EspecialidadesService } from 'src/especialidades/especialidades.service';

@Injectable()
export class CentrosaludhasespecialidadesService {
  private readonly logger = new Logger('CentroSaludHasEspecialidadesService');
  

  constructor(



    @InjectRepository(CentroSaludHasEspecialidade)
    private readonly centrosaludhasespecialidadeRepository: Repository<CentroSaludHasEspecialidade>,

    private readonly centroSaludService: CentrossaludsService,
    private readonly especialidadesService: EspecialidadesService,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createCentroSaludHasEspecialidadeDto: CreateCentrosaludhasespecialidadeDto) {
    try {
      const { idCentroSalud, idEspecialidad,...CentroSaludHasEspecialidadeDetails} = createCentroSaludHasEspecialidadeDto;
      const centrosaludhasespecialidade = this.centrosaludhasespecialidadeRepository.create({
        ...CentroSaludHasEspecialidadeDetails,
        idCentroSalud: { id: idCentroSalud },
        idEspecialidad: { id: idEspecialidad }

      });

      return await this.centrosaludhasespecialidadeRepository.save(centrosaludhasespecialidade);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.centrosaludhasespecialidadeRepository.find({
      take: limit,
      skip: offset,

    });
    
  }

  async findOne(id : number) {

    let centrosaludhasespecialidade: CentroSaludHasEspecialidade;

      const queryBuilder = this.centrosaludhasespecialidadeRepository.createQueryBuilder();
      centrosaludhasespecialidade = await queryBuilder
        .where('id =:id ',{

          id:id,
        })
        .getOne();

    if(!centrosaludhasespecialidade){
      throw new NotFoundException( `CentroSaludHasEspecialidade con id ${id} no encontrada`);
    }

    return centrosaludhasespecialidade;
    
  }

  async update(id: number, updateCentroSaludHasEspecialidadeDto: UpdateCentrosaludhasespecialidadeDto) {

    const {idCentroSalud,idEspecialidad,...toUpdate} = updateCentroSaludHasEspecialidadeDto;

    const centrosaludhasespecialidade = await this.centrosaludhasespecialidadeRepository.preload({id, ...toUpdate});

    if(!centrosaludhasespecialidade){
      throw new NotFoundException(`CentroSaludHasEspecialidade con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      if(idCentroSalud){
        
        centrosaludhasespecialidade.idCentroSalud = await this.centroSaludService.findOne(idCentroSalud);
      }

      if(idEspecialidad){
        centrosaludhasespecialidade.idEspecialidad = await this.especialidadesService.findOne(idEspecialidad);
      }

      await queryRunner.manager.save(centrosaludhasespecialidade);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      await this.centrosaludhasespecialidadeRepository.save(centrosaludhasespecialidade);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la CentroSaludHasEspecialidade');
    }
  
    
  }




  async remove(id: number) {

    const centrosaludhasespecialidade = await this.findOne(id);

    await this.centrosaludhasespecialidadeRepository.remove(centrosaludhasespecialidade);

    return { mensaje: `La centrosaludhasespecialidade con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCentroSaludHasEspecialidades(){
    const query = this.centrosaludhasespecialidadeRepository.createQueryBuilder('centrosaludhasespecialidade');

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
