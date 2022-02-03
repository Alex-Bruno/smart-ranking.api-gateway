import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/commom/pipes/validacao-parametros.pipe';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private logger = new Logger(JogadoresController.name);

    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking
    ) { }

    private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

        const categoria = await lastValueFrom(this.clientAdminBackend.send('consultar-categorias', criarJogadorDto.categoria));

        if (categoria) {
            await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
        } else
            throw new BadRequestException(`Categoria ${criarJogadorDto.categoria} não cadastrada!`)
    }

    @Get()
    consultarJogadores(
        @Query('idJpgadpr') _id: string
    ): Observable<any> {
        return this.clientAdminBackend.send('consultar-jogadores', (_id) ? _id : '');
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id') _id: string
    ) {
        this.logger.log(`atualizarJogadorDto: ${JSON.stringify(atualizarJogadorDto)}`);

        const categoria = await lastValueFrom(this.clientAdminBackend.send('consultar-categorias', atualizarJogadorDto.categoria));

        if (!atualizarJogadorDto.categoria || categoria) {
            await this.clientAdminBackend.emit('atualizar-jogador', {
                id: _id, jogador: atualizarJogadorDto
            });
        } else
            throw new BadRequestException(`Categoria ${atualizarJogadorDto.categoria} não cadastrada!`)
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    async deletarJogador(
        @Query('_id', ValidacaoParametrosPipe) _id: string
    ) {
        await this.clientAdminBackend.emit('deletar-jogador', { _id });
    }

}
