
import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "../../unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('infraestructuras') 
export class Infraestructura {

    @ApiProperty({
        example: 1,
        description: 'ID de la Infraestructura',
      })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Modulo',
        description: 'Nombre de la Infraestructura'
      })
    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idInfraestructura)
    unidadeseducativas: Unidadeseducativa[];





}
