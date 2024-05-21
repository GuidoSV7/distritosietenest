import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('desayunos')
export class Desayuno {

    @PrimaryGeneratedColumn()
    id: number;


    @Column('text')

    nombre: string;

    @Column('int')

    cantidad: number;

    @Column('text')
    nombreEntrega: string;

    @Column('timestamp')
      fecha: Date;

    @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.desayunos,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
    unidadeducativa: Unidadeseducativa;
}
