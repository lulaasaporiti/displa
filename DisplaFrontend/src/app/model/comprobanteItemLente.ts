import { Lente } from './lente';
import { ComprobanteItem } from './comprobanteItem';

export interface ComprobanteItemLente {
  Id: number,
  IdLente: number,
  IdLenteNavigation: Lente,
  IdComprobanteItem: number,
  IdComprobanteItemNavigation: ComprobanteItem,
  Cantidad: number,
  Esferico: number,
  Cilindrico: number,
  Precio: number
 
}