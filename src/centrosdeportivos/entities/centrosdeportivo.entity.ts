import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CentrosDeportivoFoto } from './centrosdeportivo-foto.entity';

@Entity('centros_deportivos')
export class CentrosDeportivos {

    @ApiProperty({
        example: '1',
        description: 'Id del Centro Deportivo',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Centro Deportivo #1',
        description: 'Nombre del Centro Deportivo',
    })
    @Column()
    nombre: string;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada X del Centro Deportivo',
    })
    @Column('decimal')
    coordenada_x: number;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada Y del Centro Deportivo',
    })
    @Column('decimal')
    coordenada_y: number;

    @ApiProperty({
        example: '123 Calle Principal',
        description: 'Dirección del Centro Deportivo',
    })
    @Column()
    direccion: string;

    @ApiProperty({
        example: 'UV001',
        description: 'UV del Centro Deportivo',
    })
    @Column()
    uv: string;

    @ApiProperty({
        example: 'lorem',
        description: 'Historia del Centro Deportivo',
    })
    @Column()
    historia: string;

    @ApiProperty({
        example: 'https://example.com/video',
        description: 'URL del video del Centro Deportivo',
    })
    @Column()
    videoUrl: string;

    @ApiProperty({
        description: 'Fotos del Centro Deportivo',
      })

    //Fotos
    @OneToMany(
        ()=> CentrosDeportivoFoto,
        (centrosdeportivoFoto) => centrosdeportivoFoto.centrosdeportivo,
        {cascade: true, eager:true}
    )
    fotos?: CentrosDeportivoFoto[];

    @ApiProperty({
        example: ' ["Ayuda en emergencia","Servicio Social"]',
        description: 'Servicios que ofrece el Centro Deportivo',
        nullable: true

    })
    @Column('text',{
        array:true,
        nullable: true,  
    })
    serviciosPublicos?: string[];
   
  
}