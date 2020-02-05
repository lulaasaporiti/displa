import { Localidad } from './localidad'

export interface Proveedor {
    Id: number,
    Nombre: string,
    Domicilio?: string,
    Telefonos?: string,
    Mail?: string,
    IdLocalidad?: number,
    IdLocalidadNavigation?: Localidad,
    UtilizaIIBB?: boolean,
    Borrado: boolean
}