import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('numeros_emergencias')
export class Numerosemergencia {
    @ApiProperty({
        example: 1,
        description: 'ID del numero de emergencia',
      })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Bomberos',
        description: 'Nombre del numero de emergencia'
      })
    @Column('text',{
        unique: true,    
    })
    nombre: string;
}
