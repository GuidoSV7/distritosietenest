import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger('CategoriasService');
  

  constructor(

   

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const {...CategoriaDetails} = createCategoriaDto;
      const categoria = this.categoriaRepository.create({
        ...CategoriaDetails
      });

      return await this.categoriaRepository.save(categoria);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.categoriaRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let categoria: Categoria;

      const queryBuilder = this.categoriaRepository.createQueryBuilder();
      categoria = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!categoria){
      throw new NotFoundException( `Categoria con id ${id} no encontrada`);
    }

    return categoria;
    
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {

    const {...toUpdate} = updateCategoriaDto;

    const categoria = await this.categoriaRepository.preload({id, ...toUpdate});

    if(!categoria){
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(categoria);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.categoriaRepository.save(categoria);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Categoria');
    }
  
    
  }




  async remove(id: number) {

    const categoria = await this.findOne(id);

    await this.categoriaRepository.remove(categoria);

    return { mensaje: `La categoria con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCategorias(){
    const query = this.categoriaRepository.createQueryBuilder('categoria');

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
