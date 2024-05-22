import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mantenimientos')
export class Mantenimiento {

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
      example: 'Saul Carriño',
      description: 'Nombre de la persona encargada del mantenimiento'
    })   
    @Column('text')
    encargado: string;


    @ApiProperty({
      example: 'Empresa de limpieza SA',
      description: 'Nombre de la empresa encargada del mantenimiento'
    })
    @Column('text',{
        nullable: true,  
    })
    empresa: string;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.mantenimientos,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;
}
