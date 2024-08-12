import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateApoyosgubernamentaleDto } from './dto/create-apoyosgubernamentale.dto';
import { UpdateApoyosgubernamentaleDto } from './dto/update-apoyosgubernamentale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Apoyosgubernamentale } from './entities/apoyosgubernamentale.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CategoriasService } from 'src/categorias/categorias.service';

@Injectable()
export class ApoyosgubernamentalesService {
  private readonly logger = new Logger('ApoyosgubernamentalesService');
  

  constructor(

   

    @InjectRepository(Apoyosgubernamentale)
    private readonly apoyogubernamentaleRepository: Repository<Apoyosgubernamentale>,

    private readonly categoriaService: CategoriasService,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createApoyosgubernamentaleDto: CreateApoyosgubernamentaleDto) {
    try {
      const {idUnidadEducativa,idCategoria, ...ApoyosocialeDetails} = createApoyosgubernamentaleDto;
      const apoyosociale = this.apoyogubernamentaleRepository.create({
        ...ApoyosocialeDetails,
        unidadeducativa: { id: idUnidadEducativa },
        categoria: idCategoria ? { id: idCategoria } : null
      });

      return await this.apoyogubernamentaleRepository.save(apoyosociale);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.apoyogubernamentaleRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let apoyosociale: Apoyosgubernamentale;

      const queryBuilder = this.apoyogubernamentaleRepository.createQueryBuilder();
      apoyosociale = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!apoyosociale){
      throw new NotFoundException( `Apoyosociale con id ${id} no encontrada`);
    }

    return apoyosociale;
    
  }

  async update(id: number, updateApoyosgubernamentaleDto: UpdateApoyosgubernamentaleDto) {

    const {idCategoria,...toUpdate} = updateApoyosgubernamentaleDto;

    const apoyosociale = await this.apoyogubernamentaleRepository.preload({id, ...toUpdate});

    if(!apoyosociale){
      throw new NotFoundException(`Apoyosociale con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{

      if(idCategoria){
        apoyosociale.categoria = await this.categoriaService.findOne(idCategoria);
      }

//

      await queryRunner.manager.save(apoyosociale);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.apoyogubernamentaleRepository.save(apoyosociale);
      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Apoyosociale');
    }
  
    
  }




  async remove(id: number) {

    const apoyosociale = await this.findOne(id);

    await this.apoyogubernamentaleRepository.remove(apoyosociale);

    return { mensaje: `El apoyo Gubernamental con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllApoyosgubernamentales(){
    const query = this.apoyogubernamentaleRepository.createQueryBuilder('apoyosgubernamentale');

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
