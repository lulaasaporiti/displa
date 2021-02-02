import { CategoriaIVA } from './categoriaIva';
import { CondicionVenta } from './condicionVenta';
import { Ficha } from './ficha';
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
    SaldoActual:number,

    IdCategoriaIvaNavigation: CategoriaIVA,
    IdCondicionVentaNavigation: CondicionVenta,
    IdLocalidadNavigation: Localidad;
    Ficha: Ficha[];
    // PrecioEspecialArticuloCliente: PrecioEspecialArticuloCliente
}
