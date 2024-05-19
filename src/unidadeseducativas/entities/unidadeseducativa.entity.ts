import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UnidadEducativaFoto } from './unidadeducativa-foto.entity';
import { Infraestructura } from '../../infraestructuras/entities/infraestructura.entity';
import { Tipocolegio } from '../../tipocolegios/entities/tipocolegio.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Gestione } from 'src/gestiones/entities/gestione.entity';

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
    @ManyToOne(() => Infraestructura ,  { onDelete: 'SET NULL', eager: true}) //eager es para mostrar datos de la foranea en la petición
    @JoinColumn({ name: 'idInfraestructura' })
    
    idInfraestructura?: Infraestructura | null; // Puede ser null

    //TipoColegio
    @ManyToOne(() => Tipocolegio,  { onDelete: 'SET NULL' , eager: true})
    @JoinColumn({ name: 'idTipoColegio' })
    idTipoColegio?: Tipocolegio | null; // Puede ser null

    //Turno
    @ManyToOne(() => Turno,  { onDelete: 'SET NULL' , eager: true})
    @JoinColumn({ name: 'idTurno' })
    idTurno?: Turno | null; // Puede ser null

    //Gestione
    @ManyToOne(() => Gestione,  { onDelete: 'SET NULL' , eager: true})
    @JoinColumn({ name: 'idGestione' })
    idGestione?: Gestione | null; // Puede ser null

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
