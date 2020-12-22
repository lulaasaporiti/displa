import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { VentaVirtualRoutingModule } from './venta-virtual-routing.module';
import { VentaVirtualListadoComponent } from './venta-virtual-listado/venta-virtual-listado.component';
import { VentaVirtualModificacionComponent } from './venta-virtual-modificacion/venta-virtual-modificacion.component';

@NgModule({
    entryComponents: [VentaVirtualModificacionComponent],
    declarations: [VentaVirtualListadoComponent, VentaVirtualModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        VentaVirtualRoutingModule,
        LoadingSpinnerModule,
        BrowserAnimationsModule,
        MatSlideToggleModule
    ]
})
export class VentaVirtualModule { }
