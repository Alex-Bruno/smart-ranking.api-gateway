import { Module } from '@nestjs/common';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { DesafiosController } from './desafios.controller';

@Module({
  imports: [ProxyrmqModule],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
