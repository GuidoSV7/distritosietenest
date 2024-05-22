import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('desayunos')
export class Desayuno {

      @ApiProperty({
        example: '2',
        description: 'Id del Desayuno',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({
      example: 'Manzana Roja con Pan con Queso',
      description: 'Nombre del Desayuno'

  })
    @Column('text')
    nombre: string;


    @ApiProperty({
      example: 60,
      description: 'Cantidad de Desayunos entregados'

  })
    @Column('int')
    cantidad: number;

    @ApiProperty({
      example: 'Ronald Carriño',
      description: 'Nombre de la persona encargada'

  })
    @Column('text')
    nombreEntrega: string;

    @ApiProperty({
      example:  '2021-10-10T00:00:00.000Z' ,
      description: 'Fecha del desayuno entregado'

   })
    @Column('timestamp')
      fecha: Date;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.desayunos,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;
}
