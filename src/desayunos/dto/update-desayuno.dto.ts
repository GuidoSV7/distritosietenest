// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateDesayunoDto } from './create-desayuno.dto';

export class UpdateDesayunoDto extends PartialType(CreateDesayunoDto) {}
