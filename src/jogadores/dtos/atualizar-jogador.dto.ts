import { IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizarJogadorDto {

    @IsOptional()
    readonly categoria?: string;

    @IsOptional()
    urlFotoJogador?: string;
    
}