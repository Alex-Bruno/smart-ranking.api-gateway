import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CriarJogadorDto {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly nome: string;

    @IsNotEmpty()
    @IsString()
    readonly categoria: string;
}