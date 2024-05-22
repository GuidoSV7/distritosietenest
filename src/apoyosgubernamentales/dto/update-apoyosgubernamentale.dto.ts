//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateApoyosgubernamentaleDto } from './create-apoyosgubernamentale.dto';

export class UpdateApoyosgubernamentaleDto extends PartialType(CreateApoyosgubernamentaleDto) {}
