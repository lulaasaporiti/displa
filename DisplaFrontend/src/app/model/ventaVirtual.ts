import { ArticuloVario } from './articuloVario';
import { ComprobanteCliente } from './comprobanteCliente';
import { Lente } from './lente';
import { Servicio } from './servicio';
import { Usuario } from './usuario';

export interface VentaVirtual {
    Id: number,
    CantidadVendida: number,
    CantidadEntregada: number,
    IdComprobante: number,
    IdArticulo: number,
    IdLente: number,
    IdServicio: number,
    Impreso: boolean, 
    IdUsuario: number,
    Monto: number,

    IdComprobanteNavigation: ComprobanteCliente,
    IdArticuloNavigation: ArticuloVario,
    IdLenteNavigation: Lente,
    IdServicioNavigation: Servicio,
    IdUsuarioNavigation: Usuario
}

