import { Funcion } from "./funcion";
import { Usuario } from "./usuario";

export interface UsuarioFuncion {
    IdUsuario: number,
    IdFuncion: number,
    IdUsuarioNavigation: Usuario,
    IdFuncionNavigation: Funcion
}