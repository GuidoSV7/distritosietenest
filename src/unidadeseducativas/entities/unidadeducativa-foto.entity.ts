import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Unidadeseducativa } from "./unidadeseducativa.entity";

@Entity({name: 'unidades_educativas_fotos'})
export class UnidadEducativaFoto{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Unidadeseducativa,
        (unidadeducativa) => unidadeducativa.fotos,
        {onDelete: 'CASCADE'}
    ) @JoinColumn({ name: 'idUnidadEducativa' })
    unidadeducativa:Unidadeseducativa


}