import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CentrosSaluds } from './centrossalud.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { Optional } from '@nestjs/common';


@Entity('centrosalud_has_especialidad')
export class CentrosSaludsEspecialidades {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CentrosSaluds, (centrosSaluds) => centrosSaluds.especialidades)
  @JoinColumn({ name: 'idCentroSalud' })
  centroSalud: CentrosSaluds;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.centrosSaludsEspecialidades)
  @JoinColumn({ name: 'idEspecialidad' })
  especialidad: Especialidade;
}