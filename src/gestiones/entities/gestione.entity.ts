import { Unidadeseducativa } from "src/unidadeseducativas/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gestione {
    
    @PrimaryGeneratedColumn()
    id: number;


    @Column('text',{
        nullable: true,  
    })
    numero: number;

    @Column('text',{
        nullable: true,  
    })
    horario: string;

    @Column('text',{
        nullable: true,  
    })

    director: string;

    @Column('text',{
        nullable: true,  
    })

    juntaescolar: string;
    


    @OneToMany(() => Unidadeseducativa, unidadeducativa => unidadeducativa.idGestione)
    unidadeseducativas: Unidadeseducativa[];

}
