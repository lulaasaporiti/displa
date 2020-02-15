import { CategoriaIVA } from './categoriaIva';
import { CondicionVenta } from './condicionVenta';
import { Localidad } from './localidad';


export interface Cliente {
    Id: number,
    Optica: string,
    Cuit: string,
    Responsable: string,
    Direccion: string,
    Telefonos: string,
    UtilizaSobre: boolean,
    MontoCredito: number,
    PlazoCredito: number,
    PorcentajeDescuentoGeneral: number,
    Mail: string,
    IdCondicionVenta: number,
    IdLocalidad: number,
    IdCategoriaIva: number,
    UsuarioWeb: string,
    PasswordWeb: string,
    Bloqueado: boolean,
    Borrado: boolean,

    IdCategoriaIvaNavigation: CategoriaIVA,
    IdCondicionVentaNavigation: CondicionVenta,
    IdLocalidadNavigation: Localidad
    // PrecioEspecialArticuloCliente: PrecioEspecialArticuloCliente
}
