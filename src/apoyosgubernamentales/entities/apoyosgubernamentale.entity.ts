import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('apoyos_gubernamentales')
export class Apoyosgubernamentale {

    @ApiProperty({
        example: 1,
        description: 'ID del Apoyo Gubernamental',
      })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 458,
        description: 'Cantidad de Apoyos Gubernamentales entregados'
      })
    @Column('int',{
        nullable: true,  
    })
    cantidad: number;

    @ApiProperty({
        example: 'Ronald Carriño',
        description: 'Nombre de la persona encargada'
      })
    @Column('text',{
        nullable: true,  
    })
    nombreEntrega: string;

    @ApiProperty({
        example: '2023-10-10',
        description: 'Fecha del apoyo gubernamental entregado'
      })
    @Column('timestamp', {
        nullable: true,
      })
      fecha: Date;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.apoyosGubernamentales,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' }) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;

    //Categoria
    @ManyToOne(() => Categoria, (categoria) => categoria.apoyosGubernamentales, { onDelete: 'SET NULL' , eager: true , nullable: true })
    @JoinColumn({ name: 'idCategoria' }) // Aquí está el cambio
    categoria: Categoria;
   
}
