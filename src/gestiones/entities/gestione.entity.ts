import { ApiProperty } from "@nestjs/swagger";
import { Unidadeseducativa } from "../../unidadeseducativas/entities";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('gestiones')
export class Gestione {
    
    @ApiProperty({
        example: '3',
        description: 'Id de la Gestion',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 70089542,
        description: 'Numero operativo de la Gestion'

    })
    @Column('text',{
        nullable: true,  
    })
    numero: number;


    @ApiProperty({
        example: '7am - 12pm',
        description: 'Horario Disponible de la Gestión'

    })
    @Column('text',{
        nullable: true,  
    })
    horario: string;

    @ApiProperty({
        example: 'Ronald Carriño',
        description: 'Nombre del Director de la Gestion'

    })
    @Column('text',{
        nullable: true,  
    })
    director: string;

    @ApiProperty({
        example: 'https://media.telemundo51.com/2023/07/New-Broward-Public-Schools-superintendent-addresses-teachers-salaries.jpg?quality=85&strip=all&resize=850%2C478',
        description: 'Foto de la Junta Escolar'

    })
    @Column('text',{
        nullable: true,  
    })
    juntaescolar: string;
    


    // Relación bidireccional con UnidadEducativa
    @OneToOne(() => Unidadeseducativa, (unidadeducativa) => unidadeducativa.gestion, {onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUnidadEducativa' })
    unidadeducativa: Unidadeseducativa;




}
