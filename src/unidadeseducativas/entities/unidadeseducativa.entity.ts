import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UnidadEducativaFoto } from './unidadeducativa-foto.entity';

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
