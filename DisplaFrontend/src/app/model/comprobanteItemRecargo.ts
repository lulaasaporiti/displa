import { ComprobanteItem } from './comprobanteItem';
import { RecargoLente } from './recargoLente';

export interface ComprobanteItemRecargo {
    Id: number,
    IdRecargo: number,
    IdRecargoNavigation: RecargoLente,
    IdComprobanteItem: number,
    IdComprobanteItemNavigation: ComprobanteItem,
    Monto: number,
}
