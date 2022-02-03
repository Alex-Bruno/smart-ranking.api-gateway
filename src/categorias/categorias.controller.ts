import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('api/v1/categorias')
export class CategoriasController {

  private logger = new Logger(CategoriasController.name);

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking
  ) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get()
  consultarCategorias(
    @Query('idCategoria') _id: string
  ): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', (_id) ? _id : '');
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string
  ) {
    this.clientAdminBackend.emit('atualizar-categoria', {
      id: _id, categoria: atualizarCategoriaDto
    });
  }
}
