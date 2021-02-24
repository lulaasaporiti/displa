import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { VentaClienteMesComponent } from './venta-cliente-mes/venta-cliente-mes.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { DetalleArticuloComponent } from './detalle-articulo/detalle-articulo.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { DejoComprarComponent } from './dejo-comprar/dejo-comprar.component';
// import { MomentDateModule } from '@angular/material-moment-adapter';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [DetalleArticuloComponent, VentaClienteMesComponent, DejoComprarComponent],
    declarations: [DetalleArticuloComponent, VentaClienteMesComponent, DejoComprarComponent],
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
