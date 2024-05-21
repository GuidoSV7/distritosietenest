import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('apoyos_gubernamentales')
export class Apoyosgubernamentale {

    @PrimaryGeneratedColumn()
    id: number;


    @Column('int',{
        nullable: true,  
    })

    cantidad: number;

    @Column('text',{
        nullable: true,  
    })
    nombreEntrega: string;

    @Column('timestamp', {
        nullable: true,
      })
      fecha: Date;

      @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.apoyosGubernamentales,{onDelete: 'CASCADE'})
      @JoinColumn({ name: 'idUnidadEducativa' }) // Aquí está el cambio
      unidadeducativa: Unidadeseducativa;
}
