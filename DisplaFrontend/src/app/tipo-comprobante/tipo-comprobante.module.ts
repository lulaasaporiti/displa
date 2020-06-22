import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoComprobanteRoutingModule } from './tipo-comprobante-routing.module';
import { TipoComprobanteBajaComponent } from './tipo-insumo-baja/tipo-comprobante-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { TipoComprobanteListadoComponent } from './tipo-comprobante-listado/tipo-comprobante-listado.component';
import { TipoComprobanteAltaComponent } from './tipo-comprobante-alta/tipo-comprobante-alta.component';
import { TipoComprobanteModificacionComponent } from './tipo-comprobante-modificacion/tipo-comprobante-modificacion.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoComprobanteAltaComponent, TipoComprobanteBajaComponent, TipoComprobanteModificacionComponent],
    declarations: [TipoComprobanteListadoComponent, TipoComprobanteAltaComponent, TipoComprobanteBajaComponent, TipoComprobanteModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoComprobanteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoComprobanteModule { }
