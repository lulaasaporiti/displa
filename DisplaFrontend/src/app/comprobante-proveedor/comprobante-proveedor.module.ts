import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobanteProveedorRoutingModule } from './comprobante-proveedor-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaProveedorComponent } from './factura/factura.component';

@NgModule({
    entryComponents: [],
    declarations: [ FacturaProveedorComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        LoadingSpinnerModule,
        ComprobanteProveedorRoutingModule,
    ]
})
export class ComprobanteProveedorModule { }