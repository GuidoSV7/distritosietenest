import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CentrosSaluds } from "./centrossalud.entity";


@Entity({name: 'centros_salud_fotos'})
export class CentrosSaludFoto{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => CentrosSaluds,
        (centrossalud) => centrossalud.fotos,
        {onDelete: 'CASCADE'}
    ) @JoinColumn({ name: 'idCentroSalud' })
    centrossalud:CentrosSaluds


}