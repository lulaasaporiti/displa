import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { TipoBlockModificacionComponent } from './tipo-block-modificacion/tipo-block-modificacion.component';
import { VentaClienteMesComponent } from './venta-cliente-mes/venta-cliente-mes.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { DetalleArticuloComponent } from './detalle-articulo/detalle-articulo.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
// import { MomentDateModule } from '@angular/material-moment-adapter';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [DetalleArticuloComponent, VentaClienteMesComponent, TipoBlockModificacionComponent],
    declarations: [DetalleArticuloComponent, VentaClienteMesComponent, TipoBlockModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        EstadisticaRoutingModule,
        MomentDateModule,
        MatNativeDateModule,
        LoadingSpinnerModule
    ]
})
export class EstadisticaModule { }
