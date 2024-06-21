import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CentrosTuristicoFoto } from "./centroturistico-foto.entity";

@Entity('centros_turisticos')

export class CentrosTuristico {
    
    @ApiProperty({
        example: '1',
        description: 'Id del Centro Turistico',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Centro Turistico #1',
        description: 'Nombre del Centro Turistico',
    })
    @Column()
    nombre: string;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada X del Centro Turistico',
    })
    @Column('decimal')
    coordenada_x: number;

    @ApiProperty({
        example: '123.456',
        description: 'Coordenada Y del Centro Turistico',
    })
    @Column('decimal')
    coordenada_y: number;

    @ApiProperty({
        example: '123 Calle Principal',
        description: 'Dirección del Centro Turistico',
    })
    @Column()
    direccion: string;

    @ApiProperty({
        example: 'UV001',
        description: 'UV del Centro Turistico',
    })
    @Column()
    uv: string;

    @ApiProperty({
        example: 'lorem',
        description: 'Historia del Centro Turistico',
    })
    @Column()
    historia: string;

    @ApiProperty({
        example: 'https://example.com/video',
        description: 'URL del video del Centro Turistico',
    })
    @Column()
    videoUrl: string;

    @ApiProperty({
        description: 'Fotos del Centro Turistico',
      })

    //Fotos
    @OneToMany(
        ()=> CentrosTuristicoFoto,
        (centrosturisticoFoto) => centrosturisticoFoto.centrosturistico,
        {cascade: true, eager:true}
    )
    fotos?: CentrosTuristicoFoto[];
 
}
