import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('centros_policiales')
export class Centrospoliciale {
    @ApiProperty({
        example: '1',
        description: 'Id de la Oficina Distrital',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Distrito Policial 1',
        description: 'Nombre del Centro Policial',
    })
    @Column('text',{
        nullable: false
    })
    nombre: string;

    @ApiProperty({
        example: 'Ronald Sahonero',
        description: 'Nombre del Encargado',
    })
    @Column('text',{
        nullable: true
    })
    encargado: string;

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
        example: '67',
        description: 'UV del Centro Policial',
    })
    @Column()
    uv?: string;

    @ApiProperty({
        example: 'Calle Landivar entre el 4to y 5to Anillo',
        description: 'Direccion de la Oficina Distrital',
    })
    @Column()
    direccion?: string;

    @ApiProperty({
        example: 'https://www.la-razon.com/wp-content/uploads/2023/01/11/02/COLEGIOS-LA-PAZ-LORETO-COLEGIO-LORETTO.jpg',
        description: 'Foto de la Oficinal',
    })
    @Column('text',{
        nullable: true
    })
    fotoUrl?: string;
    

    @ApiProperty({
        example: '7am - 12pm',
        description: 'Horario Disponible de la Oficina Distrital'

    })
    @Column('text',{
        nullable: true,  
    })
    horario?: string;

    @ApiProperty({
        example: 70089542,
        description: 'Numero operativo de la Oficina Distrital'

    })
    @Column('integer',{
        nullable: true,  
    })
    numeroTelefono?: number;

    @ApiProperty({
        example: ' ["Ayuda en emergencia","Servicio Social"]',
        description: 'Servicios que ofrece la Oficina Distrital',
        nullable: true

    })
    @Column('text',{
        array:true,
        nullable: true,  
    })
    serviciosPublicos?: string[];

}
