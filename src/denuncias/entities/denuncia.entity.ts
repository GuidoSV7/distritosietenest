import { ApiProperty } from "@nestjs/swagger";
import e from "express";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('denuncias')
export class Denuncia {
    
    @ApiProperty({
        example: '2',
        description: 'Id de la Denuncia',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({
      example: 'No se ha entregado Desayuno en la Unidad Educativa Niño Jesus',
      description: 'Mensaje de la Denuncia'

  })
    @Column('text')
    texto: string;

    @ApiProperty({
      example:  '2021-10-10T00:00:00.000Z' ,
      description: 'Fecha de la denuncia'

   })

   @CreateDateColumn({ type: 'timestamp' })
   fecha: Date;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.denuncias,{onDelete: 'CASCADE'} )
    @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;
}
