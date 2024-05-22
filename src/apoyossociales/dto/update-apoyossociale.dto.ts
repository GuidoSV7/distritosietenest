//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateApoyossocialeDto } from './create-apoyossociale.dto';

export class UpdateApoyossocialeDto extends PartialType(CreateApoyossocialeDto) {}
