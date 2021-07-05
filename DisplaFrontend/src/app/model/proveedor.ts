import { Localidad } from './localidad'

export interface Proveedor {
    Id: number,
    Nombre: string,
    Cuit: string,
    Domicilio?: string,
    Telefonos?: string,
    Mail?: string,
    IdLocalidad?: number,
    IdLocalidadNavigation?: Localidad,
    UtilizaIIBB?: boolean,
    Borrado: boolean
}