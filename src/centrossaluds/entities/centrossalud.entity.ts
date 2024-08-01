import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { CentrosSaludFoto } from './centrossalud-foto.entity';
import { CentroSaludHasEspecialidade } from 'src/centrosaludhasespecialidades/entities/centrosaludhasespecialidade.entity';
import { IsOptional } from 'class-validator';


@Entity('centros_salud')
export class CentrosSaluds {

    @ApiProperty({
        example: '1',
        description: 'Id del Centro de Salud',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Centro de Salud #1',
        description: 'Nombre del Centro de Salud',
    })
    @Column()
    nombre: string;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada X del Centro de Salud',
    })
    @Column('decimal')
    coordenada_x: number;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada Y del Centro de Salud',
    })
    @Column('decimal')
    coordenada_y: number;

    @ApiProperty({
        example: '123 Calle Principal',
        description: 'Dirección del Centro de Salud',
    })
    @Column('text')
    direccion: string;

    @ApiProperty({
        example: 'UV001',
        description: 'UV del Centro de Salud',
    })
    @Column('text')
    uv: string;

    @ApiProperty({
        example: '8:00 - 17:00',
        description: 'Horario del Centro de Salud',
    })
    @Column('text')
    horario: string;

    @ApiProperty({
        example: 1,
        description: 'Nivel del Centro de Salud',
    })
    @Column('integer')
    nivel: number;

    @ApiProperty({
        example: 'https://example.com/video',
        description: 'URL del video del Centro de Salud',
    })
    @Column('text',{
        nullable: true,  
    })
    videoUrl?: string ;

    @ApiProperty({
        example: 'https://example.com',
        description: 'URL de la página web del Centro de Salud',
    })
    @Column('text',{
        nullable: true
    })
    paginawebUrl?: string;

    @ApiProperty({
        example: ' ["https://www.google.com/imagen1.jpg","https://www.google.com/imagen2.jpg"]',
        description: 'Fotos del Centro de Salud',
      })

    //Fotos
    @OneToMany(
        ()=> CentrosSaludFoto,
        (centrossaludFoto) => centrossaludFoto.centrossalud,
        {cascade: true, eager:true}
    )
    fotos?: CentrosSaludFoto[];

    @ApiProperty({
        example:[],
        description: 'Especialidades del Centro de Salud',
      })
      
    // En CentrosSaluds
    @OneToMany(() => CentroSaludHasEspecialidade,
     (centrosSaludsEspecialidades) => centrosSaludsEspecialidades.idCentroSalud, { eager: true })
    especialidades?: CentroSaludHasEspecialidade[];
    
  
}