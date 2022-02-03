import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    readonly descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly eventos: Array<Evento>;
}

interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}