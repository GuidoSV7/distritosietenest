import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CentrosDeportivos } from "./centrosdeportivo.entity";



@Entity({name: 'centros_deportivos_fotos'})
export class CentrosDeportivoFoto{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => CentrosDeportivos,
        (centrosdeportivo) => centrosdeportivo.fotos,
        {onDelete: 'CASCADE'}
    ) @JoinColumn({ name: 'idCentroDeportivo' })
    centrosdeportivo:CentrosDeportivos


}