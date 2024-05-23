import { ApiProperty } from "@nestjs/swagger";
import { Apoyosgubernamentale } from "src/apoyosgubernamentales/entities/apoyosgubernamentale.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @ApiProperty({
        example: '1',
        description: 'Id de la categoria',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Sillas',
        description: 'Nombre de la Categoria',
        uniqueItems: true,

    })
    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @OneToMany(() => Apoyosgubernamentale, (apoyosGubernamentales) => apoyosGubernamentales.categoria)
    apoyosGubernamentales:Apoyosgubernamentale[];
  
}
