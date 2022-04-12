import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { lastValue, Observable, lastValueFrom } from 'rxjs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AwsService } from './../aws/aws.service';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Injectable()
export class JogadoresService {

    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking,
        private awsService: AwsService
    ) { }

    private logger = new Logger(JogadoresService.name);

    private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    async criarJogador(criarJogadorDto: CriarJogadorDto) {
        this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

        const categoria = await lastValueFrom(this.clientAdminBackend.send('consultar-categorias', criarJogadorDto.categoria));

        if (categoria) {
            await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
        } else
            throw new BadRequestException(`Categoria ${criarJogadorDto.categoria} não cadastrada!`)
    }

    async consultarJogadores(_id: string): Promise<any> {
        return lastValueFrom(this.clientAdminBackend.send('consultar-jogadores', (_id) ? _id : ''));
    }


    async atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, _id: string) {
        this.logger.log(`atualizarJogadorDto: ${JSON.stringify(atualizarJogadorDto)}`);

        const categoria = await lastValueFrom(this.clientAdminBackend.send('consultar-categorias', atualizarJogadorDto.categoria));

        if (!atualizarJogadorDto.categoria || categoria) {
            await this.clientAdminBackend.emit('atualizar-jogador', {
                id: _id, jogador: atualizarJogadorDto
            });
        } else
            throw new BadRequestException(`Categoria ${atualizarJogadorDto.categoria} não cadastrada!`)
    }

    async deletarJogador(_id: string) {
        await this.clientAdminBackend.emit('deletar-jogador', { _id });
    }

    async uploadArquivo(file, _id: string): Promise<any> {

        const jogador = await lastValueFrom(this.clientAdminBackend.send('consultar-jogadores', _id));

        if (!jogador)
            throw new BadRequestException(`Jogador ${_id} não encontrado!`);

        const urlFotoJogador = await this.awsService.uploadArquivo(file, _id);

        const atualizarJogadorDto: AtualizarJogadorDto = {};
        atualizarJogadorDto.urlFotoJogador = urlFotoJogador.url;

        await this.clientAdminBackend.emit('atualizar-jogador', {
            id: _id,
            jogador: atualizarJogadorDto
        });

        return await lastValueFrom(this.clientAdminBackend.send('consultar-jogadores', _id));;
    }
}
