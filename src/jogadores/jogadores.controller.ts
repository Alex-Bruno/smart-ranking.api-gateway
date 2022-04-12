import { JogadoresService } from './jogadores.service';
import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom, Observable } from 'rxjs';
import { AwsService } from 'src/aws/aws.service';
import { ValidacaoParametrosPipe } from 'src/commom/pipes/validacao-parametros.pipe';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    private logger = new Logger(JogadoresController.name);

    constructor(
        private jogadoresService: JogadoresService,
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('idJogador') _id: string
    ): Promise<any> {
        return await this.jogadoresService.consultarJogadores(_id);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id') _id: string
    ) {
       await this.jogadoresService.atualizarJogador(atualizarJogadorDto, _id);
    }

    @Delete('/:_id')
    deletarJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: string
    ) {
        this.jogadoresService.deletarJogador(_id);
    }

    @Post('/:_id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo(
        @UploadedFile() file,
        @Param('_id') _id: string
    ): Promise<any> {
        return await this.jogadoresService.uploadArquivo(file, _id);
    }
}
