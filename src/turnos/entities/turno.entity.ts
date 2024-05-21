import { Unidadeseducativa } from "../../unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('turnos')
export class Turno {
    
@PrimaryGeneratedColumn()
    id: number;

    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idTurno)
    unidadeseducativas: Unidadeseducativa[];
}
