import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('apoyos_sociales')
export class Apoyossociale {

    @ApiProperty({
        example: '1',
        description: 'ID del Apoyo Social',

    })
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({
        example: 'Apoyo Social 1',
        description: 'Nombre del Apoyo Social'

    })
    @Column('text',{
        nullable: true,  
    })
    nombre: string;

    @ApiProperty({
        example: 400,
        description: 'Cantidad de Apoyos Sociales entregados'

    })
    @Column('int',{
        nullable: true,  
    })
    cantidad: number;


    @ApiProperty({
        example: 'Ronald Carriño',
        description: 'Nombre de la persona encargada de la entrega del Apoyo Social'

    })
    @Column('text',{
        nullable: true,  
    })
    nombreEntrega: string;


    @ApiProperty({
        example: '2023-10-10',
        description: 'Fecha de la entrega del Apoyo Social'

    })
    @Column('timestamp', {
        nullable: true,
      })
    fecha: Date;
    
      @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.apoyosSociales,{onDelete: 'CASCADE'})
      @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
      unidadeducativa: Unidadeseducativa;


    
}
