
import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Infraestructura {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idInfraestructura)
    unidadeseducativas: Unidadeseducativa[];





}
