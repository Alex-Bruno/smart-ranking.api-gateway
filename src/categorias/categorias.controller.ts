import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { 
  Body, 
  Controller, 
  Get, 
  Logger, 
  Param, 
  Post, 
  Put, 
  Query, 
  UsePipes, 
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

  private logger = new Logger(CategoriasController.name);

  constructor(
    private categoriasService: CategoriasService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ) {
    this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias(
    @Query('idCategoria') _id: string
  ) {
    return await this.categoriasService.consultarCategorias((_id) ? _id : '');
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string
  ) {
    this.categoriasService.atualizarCategoria(atualizarCategoriaDto, _id);
  }
}
