import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CentrosTuristico } from "./centrosturistico.entity";


@Entity({name: 'centros_turisticos_fotos'})
export class CentrosTuristicoFoto{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => CentrosTuristico,
        (centrosturistico) => centrosturistico.fotos,
        {onDelete: 'CASCADE'}
    ) @JoinColumn({ name: 'idCentroTuristico' })
    centrosturistico:CentrosTuristico


}