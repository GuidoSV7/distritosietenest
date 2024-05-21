import { Injectable } from '@nestjs/common';
import { UnidadeseducativasService } from './../unidadeseducativas/unidadeseducativas.service';
import { initialData } from './data/seed-data';
import { InfraestructurasService } from 'src/infraestructuras/infraestructuras.service';
import { TipocolegiosService } from 'src/tipocolegios/tipocolegios.service';
import { TurnosService } from 'src/turnos/turnos.service';
import { GestionesService } from 'src/gestiones/gestiones.service';
import { ApoyossocialesService } from 'src/apoyossociales/apoyossociales.service';
import { ApoyosgubernamentalesService } from '../apoyosgubernamentales/apoyosgubernamentales.service';
import { DesayunosService } from 'src/desayunos/desayunos.service';
import { MantenimientosService } from 'src/mantenimientos/mantenimientos.service';

@Injectable()
export class SeedService {
  

  constructor(
    private readonly unidadeducativaService: UnidadeseducativasService,
    private readonly infraestructuraService: InfraestructurasService,
    private readonly tipocolegiosService: TipocolegiosService,
    private readonly turnosService: TurnosService,
    private readonly gestioneService: GestionesService,
    private readonly apoyossocialesService: ApoyossocialesService,
    private readonly apoyosgubernamentalesService: ApoyosgubernamentalesService,
    private readonly desayunosService: DesayunosService,
    private readonly mantenimientosService: MantenimientosService
  ) {}

  async runSeed(){
    await this.insertNewGestiones();
    await this.insertNewInfraestructuras();
    await this.insertNewTipoColegios();  
    await this.insertNewTurnos();
    await this.insertNewUnidadesEducativas();
    await this.insertNewApoyosSociales();
    await this.insertNewApoyosGubernamentales();
    await this.insertNewDesayunos();
    await this.insertNewMantenimientos();
    

  
    
    return 'Seed Execute';

  }

  private async insertNewGestiones(){

    await this.gestioneService.deleteAllGestiones();

    const gestiones = initialData.gestiones;
    const insertPromises = [];

    gestiones.forEach(gestione => {
      insertPromises.push(this.gestioneService.create(gestione));
    });

    await Promise.all(insertPromises);

    return true;


      
  }


  private async insertNewTurnos(){
    await this.turnosService.deleteAllTurnos;

    const turnos = initialData.turnos;
    const insertPromises = [];

    turnos.forEach(turno => {
      insertPromises.push(this.turnosService.create(turno));
    });

    await Promise.all(insertPromises);

    return true;
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

  private async insertNewApoyosSociales(){

    await this.apoyossocialesService.deleteAllApoyosociales;

    const apoyossociales = initialData.apoyossociales;
    const insertPromises = [];

    apoyossociales.forEach(apoyossoaciale => {
      insertPromises.push(this.apoyossocialesService.create(apoyossoaciale));
    });

    await Promise.all(insertPromises);

    return true;

  }

  private async insertNewApoyosGubernamentales(){

    await this.apoyosgubernamentalesService.deleteAllApoyosgubernamentales;

    const apoyosgubernamentales = initialData.apoyosgubernamentales;
    const insertPromises = [];

    apoyosgubernamentales.forEach(apoyosgubernamentale => {
      insertPromises.push(this.apoyosgubernamentalesService.create(apoyosgubernamentale));
    });

    await Promise.all(insertPromises);

    return true;

  }

  private async insertNewDesayunos(){

    await this.desayunosService.deleteAllDesayunos;

    const desayunos = initialData.desayunos;
    const insertPromises = [];

    desayunos.forEach(desayuno => {
      insertPromises.push(this.desayunosService.create(desayuno));
    });

    await Promise.all(insertPromises);

    return true;

  }

  private async insertNewMantenimientos(){

    await this.mantenimientosService.deleteAllMantenimientos;

    const mantenimientos = initialData.mantenimientos;
    const insertPromises = [];

    mantenimientos.forEach(mantenimiento => {
      insertPromises.push(this.mantenimientosService.create(mantenimiento));
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
