import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UnidadEducativaFoto } from './unidadeducativa-foto.entity';
import { Infraestructura } from 'src/infraestructuras/entities/infraestructura.entity';
import { Tipocolegio } from 'src/tipocolegios/entities/tipocolegio.entity';

@Entity({name: 'unidades_educativas'})
export class Unidadeseducativa {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,    
    })
    nombre: string;

    @Column('text',{
          nullable: true,    
    })
    coordenada_x: number;
    
    @Column('text',{
        nullable: true,    
    })
    coordenada_y: number;

    @Column('text',{
        nullable: true,    
    })
    direccion: string;

    @Column('text',{
        nullable: true,    
    })
    historia: string;

    @Column('text',{
        nullable: true,    
    })
    video: string;


    @Column('text', {
        unique: true
    })
    slug: string;

    //Fotos
    @OneToMany(
        ()=> UnidadEducativaFoto,
        (unidadeducativaFoto) => unidadeducativaFoto.unidadeducativa,
        {cascade: true, eager:true}
    )
    fotos?: UnidadEducativaFoto[];


    //Infraestructura
    @OneToOne(() => Infraestructura ,  { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'idInfraestructura' })
    idInfraestructura: Infraestructura | null; // Puede ser null

    //TipoColegio
    @OneToOne(() => Tipocolegio,  { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'idTipoColegio' })
    idTipoColegio: Tipocolegio | null; // Puede ser null

    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.nombre;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }
    



}
