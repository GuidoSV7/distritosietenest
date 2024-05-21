import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('apoyos_sociales')
export class Apoyossociale {


    @PrimaryGeneratedColumn()
    id: number;


    @Column('text',{
        nullable: true,  
    })

    nombre: string;

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
    
      @ManyToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.apoyosSociales,{onDelete: 'CASCADE'})
      @JoinColumn({ name: 'idUnidadEducativa' ,}) // Aquí está el cambio
      unidadeducativa: Unidadeseducativa;


    
}
