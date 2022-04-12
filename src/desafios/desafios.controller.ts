import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Logger,
    Get,
    Query,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { DesafioStatus } from './desafio-status.enum';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(
        private desafiosService: DesafiosService
    ) { }

    private readonly logger = new Logger(DesafiosController.name);

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto
    ) {

        await this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @Get()
    async consultarDesafios(
        @Query('idJogador') idJogador: string
    ): Promise<any> {
        return await this.desafiosService.consultarDesafios(idJogador);
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string
    ) {
        await this.desafiosService.atualizarDesafio(atualizarDesafioDto, _id);

    }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(
        @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        @Param('desafio') _id: string
    ) {
        this.desafiosService.atribuirDesafioPartida(atribuirDesafioPartidaDto, _id);
    }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('_id') _id: string
    ) {
        await this.desafiosService.deletarDesafio(_id);
    }
}
