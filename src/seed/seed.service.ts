import { Injectable } from '@nestjs/common';
import { UnidadeseducativasService } from './../unidadeseducativas/unidadeseducativas.service';
import { initialData } from './data/seed-data';
import { InfraestructurasService } from 'src/infraestructuras/infraestructuras.service';
import { TipocolegiosService } from 'src/tipocolegios/tipocolegios.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly unidadeducativaService: UnidadeseducativasService,
    private readonly infraestructuraService: InfraestructurasService,
    private readonly tipocolegiosService: TipocolegiosService
  ) {}

  async runSeed(){
    await this.insertNewInfraestructuras();
    await this.insertNewTipoColegios();  
    await this.insertNewUnidadesEducativas();
  
    
    return 'Seed Execute';

  }


  private async insertNewInfraestructuras(){
    await this.infraestructuraService.deleteAllInfraestructuras();

    const infraestructuras = initialData.infraestructuras;
    const insertPromises = [];

    

    infraestructuras.forEach(infraestructuras => {
      insertPromises.push(this.infraestructuraService.create(infraestructuras));
     
    });

    await Promise.all(insertPromises);

    return true;

  }


  private async insertNewTipoColegios(){

    await this.tipocolegiosService.deleteAllTipocolegios();

    const tipocolegios = initialData.tipocolegios;
    const insertPromises = [];

    tipocolegios.forEach(tipocolegio => {
      insertPromises.push(this.tipocolegiosService.create(tipocolegio));
    });

    await Promise.all(insertPromises);

    return true;

  }


  
  private async insertNewUnidadesEducativas(){

    await this.unidadeducativaService.deleteAllUnidadesEducativas();

    const unidadeseducativas = initialData.unidadeseducativas;
    const insertPromises = [];

    unidadeseducativas.forEach(unidadeducativa => {
      insertPromises.push(this.unidadeducativaService.create(unidadeducativa));
    });

    await Promise.all(insertPromises);

    return true;


      
  }

}
