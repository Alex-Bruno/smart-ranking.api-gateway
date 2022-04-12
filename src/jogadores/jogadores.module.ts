import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [ProxyrmqModule, AwsModule],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
