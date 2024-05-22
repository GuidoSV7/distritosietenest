import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "../../unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('turnos')
export class Turno {

    @ApiProperty({
        example: '3',
        description: 'Id del Turno',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Mañana',
        description: 'Nombre del Turno',
        uniqueItems: true,

    })
    @Column('text',{
        unique: true,    
    })
    nombre: string;
    
    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idTurno)
    unidadeseducativas: Unidadeseducativa[];
}
