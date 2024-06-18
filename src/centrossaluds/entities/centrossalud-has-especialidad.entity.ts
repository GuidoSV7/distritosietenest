import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CentrosSaluds } from './centrossaludentity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';


@Entity('centrosalud_has_especialidad')
export class CentrosSaludsEspecialidades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  encargado: string;

  @ManyToOne(() => CentrosSaluds, (centrosSaluds) => centrosSaluds.especialidades)
  @JoinColumn({ name: 'idCentroSalud' })
  centrosSaluds: CentrosSaluds;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.centrosSaludsEspecialidades)
  @JoinColumn({ name: 'idEspecialidad' })
  especialidade: Especialidade;
}