import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { TipoBlockModificacionComponent } from './tipo-block-modificacion/tipo-block-modificacion.component';
import { TipoBlockBajaComponent } from './tipo-block-baja/tipo-block-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { DetalleArticuloComponent } from './detalle-articulo/detalle-articulo.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [DetalleArticuloComponent, TipoBlockBajaComponent, TipoBlockModificacionComponent],
    declarations: [DetalleArticuloComponent, TipoBlockBajaComponent, TipoBlockModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        EstadisticaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class EstadisticaModule { }
