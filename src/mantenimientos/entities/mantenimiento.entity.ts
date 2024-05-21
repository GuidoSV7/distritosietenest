import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mantenimientos')
export class Mantenimiento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')

    titulo: string;

    @Column('timestamp')
      fecha: Date;


    @Column('text')
    encargado: string;

    @Column('text',{
        nullable: true,  
    })
    empresa: string;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.mantenimientos,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;
}
