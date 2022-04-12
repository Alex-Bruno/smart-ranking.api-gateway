import { lastValueFrom } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking
  ) {}

  private readonly logger = new Logger(CategoriasService.name);

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  criarCategoria(criarCategoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  async consultarCategorias(_id: string): Promise<any> {
    return lastValueFrom(this.clientAdminBackend.send('consultar-categorias', (_id) ? _id : ''));
  }

  atualizarCategoria(atualizarCategoriaDto: AtualizarCategoriaDto, _id: string) {
    this.clientAdminBackend.emit('atualizar-categoria', {
      id: _id, categoria: atualizarCategoriaDto
    });
  }

}
