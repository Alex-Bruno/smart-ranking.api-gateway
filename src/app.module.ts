import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { AwsModule } from './aws/aws.module';
import { DesafiosModule } from './desafios/desafios.module';
import { RankingsModule } from './rankings/rankings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    ProxyrmqModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DesafiosModule,
    RankingsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
