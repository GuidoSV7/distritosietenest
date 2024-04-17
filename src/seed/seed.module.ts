import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UnidadeseducativasModule } from 'src/unidadeseducativas/unidadeseducativas.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UnidadeseducativasModule],
})
export class SeedModule {}
