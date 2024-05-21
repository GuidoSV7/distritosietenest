import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateUnidadeseducativaDto } from './dto/create-unidadeseducativa.dto';
import { UpdateUnidadeseducativaDto } from './dto/update-unidadeseducativa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidadeseducativa } from './entities/unidadeseducativa.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID, IsString } from 'class-validator';
import { UnidadEducativaFoto } from './entities';
import { Tipocolegio } from '../tipocolegios/entities/tipocolegio.entity';

@Injectable()
export class UnidadeseducativasService {

  private readonly logger = new Logger('UnidadesEducativasService');

  constructor(
    @InjectRepository(Unidadeseducativa)
    private readonly unidadeseducativaRepository: Repository<Unidadeseducativa>,

    @InjectRepository(UnidadEducativaFoto)
    private readonly unidadeseducativaFotoRepository: Repository<UnidadEducativaFoto>,

    private readonly dataSource: DataSource,
  ){}


  async create(createUnidadeseducativaDto: CreateUnidadeseducativaDto) {

    try{

      const {fotos = [], idInfraestructura, idTipoColegio, idTurno, idGestion, ...unidadeducativaDetails} = createUnidadeseducativaDto;

      const unidadeducativa = this.unidadeseducativaRepository.create({
        ...unidadeducativaDetails,
        fotos: fotos.map(foto => this.unidadeseducativaFotoRepository.create({url: foto})),
        idInfraestructura: { id: idInfraestructura },
        idTipoColegio: { id: idTipoColegio },
        idTurno: { id: idTurno },
        idGestion: { id: idGestion }
      });

      return await this.unidadeseducativaRepository.save(unidadeducativa);

    }catch (error){
      this.logger.error(error.message);
      return error.message;
    }
    
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.unidadeseducativaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        fotos: true,

      }
    });
    
  }

  async findOne(id : number) {

    let unidadeducativa: Unidadeseducativa;

      const queryBuilder = this.unidadeseducativaRepository.createQueryBuilder("unidadeducativa");
      unidadeducativa = await queryBuilder
      
        .where('unidadeducativa.id =:id',{
          id:id,
        })
        .leftJoinAndSelect("unidadeducativa.fotos", "fotos")
        .leftJoinAndSelect("unidadeducativa.idInfraestructura", "Infraestructura")
        .leftJoinAndSelect("unidadeducativa.idTurno", "Turno")
        .leftJoinAndSelect("unidadeducativa.idGestion", "Gestione")       
        .leftJoinAndSelect("unidadeducativa.apoyosSociales", "Apoyossociale")  
        .leftJoinAndSelect("unidadeducativa.apoyosGubernamentales", "Apoyosgubernamentale") 
        .leftJoinAndSelect("unidadeducativa.desayunos", "Desayuno") 
        .leftJoinAndSelect("unidadeducativa.mantenimientos", "Mantenimiento") 
        .getOne();

    if(!unidadeducativa){
      throw new NotFoundException( `Unidad Educativa con id ${id} no encontrada`);
    }

    return unidadeducativa;
    
  }

  async update(id: number, updateUnidadeseducativaDto: UpdateUnidadeseducativaDto) {

    const { fotos, ...toUpdate } = updateUnidadeseducativaDto;
  
    const unidadeducativa = await this.unidadeseducativaRepository.preload({
      id,
      ...toUpdate,
      
      idInfraestructura: { id: updateUnidadeseducativaDto.idInfraestructura },
      idTipoColegio: { id: updateUnidadeseducativaDto.idTipoColegio },
      idTurno: { id: updateUnidadeseducativaDto.idTurno },
      idGestion: { id: updateUnidadeseducativaDto.idGestion }
    });
  
    if(!unidadeducativa){
      throw new NotFoundException(`Unidad Educativa con id ${id} no encontrada`);
    }
  
    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
  
    await queryRunner.startTransaction();
  
    try{
  
      if(fotos){
        await queryRunner.manager.delete(UnidadEducativaFoto, {unidadeducativa: {id}});
        
        unidadeducativa.fotos = fotos.map(foto => this.unidadeseducativaFotoRepository.create({url: foto}));
      }
  
      await queryRunner.manager.save(unidadeducativa);
  
      await queryRunner.commitTransaction();
      await queryRunner.release();
  
      return this.findOnePlain(id);
  
    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
  
      throw new InternalServerErrorException('Error al actualizar los datos de la Unidad Educativa');
    }
  }

  async findOnePlain( id: number) {
    const { fotos = [], ...rest } = await this.findOne( id );
    return {
      ...rest,
      fotos: fotos.map( foto => foto.url )
    }
  }


  async remove(id: number) {

    const unidadeducativa = await this.findOne(id);

    await this.unidadeseducativaRepository.remove(unidadeducativa);

    return { mensaje: `La Unidad Educativa con id ${id} se eliminó exitosamente.` };
    
  }

  async deleteAllUnidadesEducativas(){
    const query = this.unidadeseducativaRepository.createQueryBuilder('unidadeducativa');

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
