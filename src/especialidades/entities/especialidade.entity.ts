import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CentrosSaluds } from 'src/centrossaluds/entities/centrossalud.entity';
import { CentrosSaludsEspecialidades } from 'src/centrossaluds/entities/centrossalud-has-especialidad.entity';


@Entity('especialidades')
export class Especialidade {

    @ApiProperty({
        example: '1',
        description: 'Id de la Especialidad',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Cardiología',
        description: 'Nombre de la Especialidad',
    })
    @Column()
    nombre: string;

    // @ApiProperty({
    //     example: 'Dr. Juan Pérez',
    //     description: 'Encargado de la Especialidad',
    // })
    // @Column()
    // encargado: string;

    @ApiProperty({
        description: 'Centros de Salud que ofrecen esta Especialidad',
    })
    // En Especialidade
    @OneToMany(() => CentrosSaludsEspecialidades, (centrosSaludsEspecialidades) => centrosSaludsEspecialidades.especialidad)
    centrosSaludsEspecialidades: CentrosSaludsEspecialidades[];
}