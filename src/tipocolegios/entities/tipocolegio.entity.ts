import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "../../unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipocolegios')
export class Tipocolegio {

    @ApiProperty({
        example: '1',
        description: 'ID del Tipo de Colegio',

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Publico',
        description: 'Nombre del Tipo de Colegio'

    })
    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idTipoColegio)
    unidadeseducativas: Unidadeseducativa[];


}
