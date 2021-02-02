import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { VentaVirtualRoutingModule } from './venta-virtual-routing.module';
import { VentaVirtualListadoComponent } from './venta-virtual-listado/venta-virtual-listado.component';
import { VentaVirtualModificacionComponent } from './venta-virtual-modificacion/venta-virtual-modificacion.component';
import { VentaVirtualMovimientosComponent } from './venta-virtual-movimientos/venta-virtual-movimientos.component';

@NgModule({
    entryComponents: [VentaVirtualModificacionComponent, VentaVirtualMovimientosComponent],
    declarations: [VentaVirtualListadoComponent, VentaVirtualModificacionComponent, VentaVirtualMovimientosComponent],
    imports: [
        CommonModule,
        MaterialModule,
        VentaVirtualRoutingModule,
        LoadingSpinnerModule,
        BrowserAnimationsModule,
        // MatSlideToggleModule
    ]
})
export class VentaVirtualModule { }
