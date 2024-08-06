import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateUnidadeseducativaDto } from './dto/create-unidadeseducativa.dto';
import { UpdateUnidadeseducativaDto } from './dto/update-unidadeseducativa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidadeseducativa } from './entities/unidadeseducativa.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UnidadEducativaFoto } from './entities';
import { Gestione } from 'src/gestiones/entities/gestione.entity';
import { GestionesService } from 'src/gestiones/gestiones.service';
import { InfraestructurasService } from 'src/infraestructuras/infraestructuras.service';
import { TurnosService } from 'src/turnos/turnos.service';
import { TipocolegiosService } from 'src/tipocolegios/tipocolegios.service';


@Injectable()
export class UnidadeseducativasService {

  private readonly logger = new Logger('UnidadesEducativasService');

  constructor(
    @InjectRepository(Unidadeseducativa)
    private readonly unidadeseducativaRepository: Repository<Unidadeseducativa>,

    @InjectRepository(UnidadEducativaFoto)
    private readonly unidadeseducativaFotoRepository: Repository<UnidadEducativaFoto>,

    @InjectRepository(Gestione)
    private readonly gestioneRepository: Repository<Gestione>,

    private readonly infraestructuraService: InfraestructurasService,
    private readonly turnosService: TurnosService,
    private readonly tipocolegioService: TipocolegiosService,


    private readonly dataSource: DataSource,
  ){}

//
  async create(createUnidadeseducativaDto: CreateUnidadeseducativaDto) {

    try{

      const {fotos = [],gestion, idInfraestructura, idTipoColegio, idTurno,  ...unidadeducativaDetails} = createUnidadeseducativaDto;

      const unidadeducativa = this.unidadeseducativaRepository.create({
        ...unidadeducativaDetails,
        fotos: fotos.map(foto => this.unidadeseducativaFotoRepository.create({url: foto})),
        
        idInfraestructura: { id: idInfraestructura },
        idTipoColegio: { id: idTipoColegio },
        idTurno: { id: idTurno }, 
        gestion: this.gestioneRepository.create({
         ...gestion
        })
          
      });
      //

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
        idInfraestructura: true,
        idTurno: true,

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
        .leftJoinAndSelect("unidadeducativa.idTipoColegio", "Tipocolegio")
        .leftJoinAndSelect("unidadeducativa.gestion", "Gestione")       
        .leftJoinAndSelect("unidadeducativa.apoyosSociales", "Apoyossociale")  
        .leftJoinAndSelect("unidadeducativa.apoyosGubernamentales", "Apoyosgubernamentale") 
        .leftJoinAndSelect("unidadeducativa.desayunos", "Desayuno") 
        .leftJoinAndSelect("unidadeducativa.mantenimientos", "Mantenimiento") 
        .leftJoinAndSelect("unidadeducativa.denuncias", "Denuncia")
        .leftJoinAndSelect("unidadeducativa.visitas", "Visita")
        
        .getOne();

    if(!unidadeducativa){
      throw new NotFoundException( `Unidad Educativa con id ${id} no encontrada`);
    }

    return unidadeducativa;
    
  }

  async update(id: number, updateUnidadeseducativaDto: UpdateUnidadeseducativaDto) {

    const { fotos, gestion, idInfraestructura,idTipoColegio,idTurno, ...toUpdate } = updateUnidadeseducativaDto;

  
    const unidadeducativa = await this.unidadeseducativaRepository.preload({
      id,
      ...toUpdate,

    });

   
    if(!unidadeducativa){
      throw new NotFoundException(`Unidad Educativa con id ${id} no encontrada`);
    }

  
    //Create Query Runner//
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
  
    await queryRunner.startTransaction();
  
    try{
      
  
      if(fotos){
        await queryRunner.manager.delete(UnidadEducativaFoto, {unidadeducativa: {id}});
        
        unidadeducativa.fotos = fotos.map(foto => this.unidadeseducativaFotoRepository.create({url: foto}));
      }

      if (gestion) {
        // Paso 1: Recuperar el registro existente
        const gestionExistente = await this.gestioneRepository.findOne({
          where: { unidadeducativa: { id } },
        });
      
        if (gestionExistente) {
          // Paso 2: Actualizar solo los campos necesarios
          const camposAActualizar = {
            ...gestionExistente, // Conserva los valores existentes
            ...gestion, // Sobrescribe solo los campos proporcionados en `gestion`
          };
      
          // Paso 3: Guardar el registro actualizado
          unidadeducativa.gestion = await this.gestioneRepository.save(camposAActualizar);
        } else {
          // Si no existe, crea uno nuevo (como en tu implementación actual)
          unidadeducativa.gestion = this.gestioneRepository.create({
            ...gestion,
          });
        }
      }

      if(idInfraestructura){
        unidadeducativa.idInfraestructura = await this.infraestructuraService.findOne(idInfraestructura);
      }

      if(idTipoColegio){
        unidadeducativa.idTipoColegio = await this.tipocolegioService.findOne(idTipoColegio);
      }

      if(idTurno){
        unidadeducativa.idTurno = await this.turnosService.findOne(idTurno);
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
      fotos: fotos.map( foto => foto.url ),


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
