import { Module } from '@nestjs/common';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [ProxyrmqModule],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
