import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateUnidadeseducativaDto } from './dto/create-unidadeseducativa.dto';
import { UpdateUnidadeseducativaDto } from './dto/update-unidadeseducativa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidadeseducativa } from './entities/unidadeseducativa.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { UnidadEducativaFoto } from './entities';

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

      const {fotos = [], ...unidadeducativaDetails} = createUnidadeseducativaDto;

      const unidadeducativa = this.unidadeseducativaRepository.create({
        ...unidadeducativaDetails,
        fotos: fotos.map(foto => this.unidadeseducativaFotoRepository.create({url: foto}))
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
        fotos: true
      }
    });
    
  }

  async findOne(term: string) {

    let unidadeducativa: Unidadeseducativa;

    if(isUUID(term)){
      unidadeducativa = await this.unidadeseducativaRepository.findOneBy({id:term});
    }else{
      const queryBuilder = this.unidadeseducativaRepository.createQueryBuilder();
      unidadeducativa = await queryBuilder
        .where('nombre =:nombre or slug =:slug',{
          nombre: term,
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('Unidadeseducativa.fotos', 'fotos')
        .getOne();
    }

    if(!unidadeducativa){
      throw new NotFoundException( `Unidad Educativa con id ${term} no encontrada`);
    }

    return unidadeducativa;
    
  }

  async update(id: string, updateUnidadeseducativaDto: UpdateUnidadeseducativaDto) {

    const {fotos, ...toUpdate} = updateUnidadeseducativaDto;

    const unidadeducativa = await this.unidadeseducativaRepository.preload({id, ...toUpdate});

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

      // await this.unidadeseducativaRepository.save(unidadeducativa);
      return this.findOnePlain(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Unidad Educativa');
    }
  
    
  }

  async findOnePlain( term: string ) {
    const { fotos = [], ...rest } = await this.findOne( term );
    return {
      ...rest,
      images: fotos.map( foto => foto.url )
    }
  }


  async remove(id: string) {

    const unidadeducativa = await this.findOne(id);

    await this.unidadeseducativaRepository.remove(unidadeducativa);
    
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
