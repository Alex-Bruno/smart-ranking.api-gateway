import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [ProxyrmqModule, AwsModule],
  controllers: [JogadoresController]
})
export class JogadoresModule {}
