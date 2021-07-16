import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobanteProveedorRoutingModule } from './comprobante-proveedor-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaProveedorComponent } from './factura/factura.component';
import { NotaCreditoProveedorComponent } from './nota-credito/nota-credito.component';
import { NotaDebitoProveedorComponent } from './nota-debito/nota-debito.component';
import { ConsultaComprobanteProveedorComponent } from './consulta-comprobante/consulta-comprobante.component';
import { ReciboProveedorComponent } from './recibo/recibo.component';

@NgModule({
    entryComponents: [],
    declarations: [ FacturaProveedorComponent, NotaCreditoProveedorComponent, NotaDebitoProveedorComponent, ConsultaComprobanteProveedorComponent, ReciboProveedorComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        LoadingSpinnerModule,
        ComprobanteProveedorRoutingModule,
    ]
})
export class ComprobanteProveedorModule { }