import { Usuario } from './usuario';
import { PrecioLente } from './precioLente';

export interface Lente {
    Id: number,
    Nombre: string,
    DescripcionFactura: string,
    Combinacion: string,
    GraduacionesCilindricas: string,
    ControlaStock: boolean,
    EsBifocal: boolean,
    MediosPares: boolean,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario,
    FechaCreacion: Date,
    IngresosBrutos: number,
    Borrado: boolean
    PrecioLente: PrecioLente[]
}
