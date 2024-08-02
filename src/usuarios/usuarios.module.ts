import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { User } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports:[TypeOrmModule.forFeature([User]),]
})
export class UsuariosModule {}
