import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UnidadEducativaFoto } from './unidadeducativa-foto.entity';
import { Infraestructura } from '../../infraestructuras/entities/infraestructura.entity';
import { Tipocolegio } from '../../tipocolegios/entities/tipocolegio.entity';
import { Turno } from '../../turnos/entities/turno.entity';
import { Denuncia } from '../../denuncias/entities/denuncia.entity';
import { Gestione } from 'src/gestiones/entities/gestione.entity';
import { Apoyossociale } from 'src/apoyossociales/entities/apoyossociale.entity';
import { Apoyosgubernamentale } from 'src/apoyosgubernamentales/entities/apoyosgubernamentale.entity';

import { Mantenimiento } from 'src/mantenimientos/entities/mantenimiento.entity';
import { Desayuno } from 'src/desayunos/entities/desayuno.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'unidades_educativas'})

export class Unidadeseducativa {

    @ApiProperty({
        example: '2',
        description: 'Id de la Unidad Educativa',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Unidad Educativa 1',
        description: 'Nombre de la Unidad Educativa',
        nullable: false,
        minLength: 1,
    })
    @Column('text',{
          
    })
    nombre: string;


    @ApiProperty({
        example: -63.137352,
        description: 'Coordenada X de la Unidad Educativa',
        nullable: false,

    })
    @Column('text',{
          nullable: true,    
    })
    coordenada_x: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Coordenada Y de la Unidad Educativa',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    coordenada_y: number;


    @ApiProperty({
        example: 'Av. 6 de Agosto Nro. 2530',
        description: 'Dirección de la Unidad Educativa',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    direccion: string;


    @ApiProperty({
        example: 'El 13 de Enero de 1991 se obtiene la Resolución Administartica cambiando el nombre de julio leigue hurtado a Nacional Ayacucho tránsmite que se realizó por el Prof...',
        description: 'Historia de la Unidad Educativ',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    historia: string;


    @ApiProperty({
        example: ' https://www.youtube.com/watch?v=kyN623RzFe0',
        description: 'Video de la Unidad Educativa URL',
        nullable: true,

    })
    @Column('text',{
        nullable: true,    
    })
    video?: string;


    @ApiProperty({
        example: ' unidad-educativa',
        description: 'Slug de la Unidad Educativa',
        nullable: false,

    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: ' ["https://www.google.com/imagen1.jpg","https://www.google.com/imagen2.jpg"]',
        description: ' Fotos de la Unidad Educativa URL',
        nullable: true,

    })
    //Fotos
    @OneToMany(
        ()=> UnidadEducativaFoto,
        (unidadeducativaFoto) => unidadeducativaFoto.unidadeducativa,
        {cascade: true, eager:true}
    )
    fotos?: UnidadEducativaFoto[];

    @ApiProperty({
        example: '1',
        description: 'Id de la Infraestructura de la Unidad Educativa',
        nullable: false,

    })
    //Infraestructura
    @ManyToOne(() => Infraestructura ,  { onDelete: 'SET NULL', eager: true, cascade:true}) //eager es para mostrar datos de la foranea en la petición
    @JoinColumn({ name: 'idInfraestructura' })
    idInfraestructura?: Infraestructura | null; // Puede ser null


    @ApiProperty({
        example: '1',
        description: 'Id del TipoColegio de la Unidad Educativa',
        nullable: false,

    })
    //TipoColegio
    @ManyToOne(() => Tipocolegio,  { onDelete: 'SET NULL' , eager: true, cascade:true})
    @JoinColumn({ name: 'idTipoColegio' })
    idTipoColegio?: Tipocolegio | null; // Puede ser null


    @ApiProperty({
        example: '1',
        description: 'Id del Turno de la Unidad Educativa',
        nullable: false,

    })
    
    //Turno
    @ManyToOne(() => Turno,  { onDelete: 'SET NULL' , eager: true, cascade:true})
    @JoinColumn({ name: 'idTurno' })
    idTurno?: Turno | null; // Puede ser null

    @ApiProperty({
        example: '1',
        description: 'Id de la Gestion de la Unidad Educativa',
        nullable: true,

    })


    
    // Gestion
    @OneToOne(() => Gestione, (gestione) => gestione.unidadeducativa,  {cascade: true, eager:true})
    gestion?: Gestione[];

    @ApiProperty({
      type: () => Apoyossociale,
      isArray: true,
      description: 'La lista de apoyos sociales asociados a esta unidad educativa.',
      example: [{id: 1, nombre: 'Apoyo Social 1', cantidad: 200, nombreEntrega: 'Ronald Camino', fecha: '2021-10-10'}]

    })
    //APoyos Sociales
    @OneToMany(() => Apoyossociale, (apoyossociales) => apoyossociales.unidadeducativa, { eager: true})
    apoyosSociales: Apoyossociale[];

    @ApiProperty({
        type: () => Apoyosgubernamentale,
        isArray: true,
        description: 'La lista de apoyos gubernamentales asociados a esta unidad educativa.',
        example: [{id: 1, cantidad: 30, nombreEntrega: "Ronald Sahonero", fecha: "2023-07-10"}]

  
      })
    //Apoyos Gubernamentales
    @OneToMany(() => Apoyosgubernamentale, (apoyosgubernamentales) => apoyosgubernamentales.unidadeducativa, { eager: true})
    apoyosGubernamentales: Apoyosgubernamentale[];

    @ApiProperty({
        type: () => Desayuno,
        isArray: true,
        description: 'La lista de Desayunos asociados a esta unidad educativa.',
        example: [{id: 1, nombre: 'Pan con Queso', cantidad:300, nombreEntrega: "Takeshi Sahonero Salas", fecha: '2023-07-10'}]
  
      })
    //Desayunos
    @OneToMany(() => Desayuno, (desayunos) => desayunos.unidadeducativa,{eager:true})
    desayunos: Desayuno[]
    
    @ApiProperty({
        type: () => Denuncia,
        isArray: true,
        description: 'La lista de Denuncias asociados a esta unidad educativa.',
        example: [{id: 1, texto: 'No llegó el Desayuno', imageUrl: 'http://res.cloudinary.com/dc629i0tc/image/upload/v1719068039/j6quyouumksuktfxnjic.jpg', fecha: '2023-07-10'}]
  
      })

    //Denuncias
    @OneToMany(() => Denuncia, (denuncias) => denuncias.idUnidadeducativa,{eager:true})
    denuncias: Denuncia[]

    @ApiProperty({
        type: () => Mantenimiento,
        isArray: true,
        description: 'La lista de Mantenimientos asociados a esta unidad educativa.',
        example: [{id: 1, titulo: 'Fumigacion del Parque', fecha: '2023-07-10', encargado: "Takeshi Sahonero Salas", empresa: "Fumigaciones SRLA" }]
  
      })
    //Mantenimientos
    @OneToMany(()=> Mantenimiento, (mantenimientos) => mantenimientos.unidadeducativa, {eager:false})
    mantenimientos: Mantenimiento[]


      


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
