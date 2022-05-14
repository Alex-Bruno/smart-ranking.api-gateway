import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidacaoParametrosPipe } from 'src/commom/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async consultarJogadores(
        @Query('idJogador') _id: string,
        @Req() req: Request
    ): Promise<any> {
        this.logger.log(`req: ${JSON.stringify(req.user)}`);
        
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
