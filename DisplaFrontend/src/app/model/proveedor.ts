import { Localidad } from './localidad'

export interface Proveedor {
    id: number,
    nombre: string,
    domicilio?: string,
    telefonos?: string,
    mail?: string,
    idLocalidad?: number,
    idLocalidadNavigation?: Localidad,
    utilizaIIBB?: boolean,
    borrado: boolean
}