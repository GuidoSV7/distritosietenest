import { ApiProperty } from "@nestjs/swagger";
import { CentrosSaluds } from "src/centrossaluds/entities/centrossalud.entity";
import { Especialidade } from "src/especialidades/entities/especialidade.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('centrosalud_has_especialidad')
export class CentroSaludHasEspecialidade {
    @PrimaryGeneratedColumn()
    id: number;ç

  
    @ManyToOne(() => CentrosSaluds)
    @JoinColumn({ name: 'idCentroSalud' })
    idCentroSalud: CentrosSaluds;


    @ManyToOne(() => Especialidade, {onDelete: 'SET NULL', eager: true , cascade:true})
    @JoinColumn({ name: 'idEspecialidad' })
    idEspecialidad: Especialidade;

    @ApiProperty({
        example: 'José Guzman Castedo',
        description: 'Encargado de la Especialidad',
    })
    @Column('text')
    encargado: string;
}
