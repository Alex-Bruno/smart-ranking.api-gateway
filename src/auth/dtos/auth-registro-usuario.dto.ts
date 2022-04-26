import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator";

export class AuthRegistroUsuarioDto {

    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'senha inválida' })
    senha: string;

    @IsMobilePhone('pt-BR')
    telefoneCelular: string;
    
}