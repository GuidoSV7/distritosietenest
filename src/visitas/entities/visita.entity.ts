import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity('visitas')
export class Visita {
    
    @ApiProperty({
        example: '1',
        description: 'Id del Mantenimiento',

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
      example: 'Limpieza de baños',
      description: 'Titulo del Mantenimiento'
    })
    @Column('text')
    titulo: string;

  
    @ApiProperty({
      example: '2023-10-10',
      description: 'Fecha del mantenimiento'
    })
    @Column('timestamp')
    fecha: Date;


    @ApiProperty({
      example: 'Revisar Funciones de la UE',
      description: 'Motivo de la Visita'
    })   
    @Column('text')
    motivo: string;


    @ApiProperty({
      example: 'https://www.foto.com',
      description: 'Foto de los Visitantes'
    })
    @Column('text',{
        nullable: true,  
    })
    fotoUrl: string;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.visitas,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' ,}) 
    unidadeducativa: Unidadeseducativa;
}
