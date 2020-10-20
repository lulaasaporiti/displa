import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaRoutingModule } from './factura-routing.module';
import { ClienteSeleccionComponent } from './cliente-seleccion/cliente-seleccion.component';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';
import { MatListModule } from '@angular/material';
import { ProductoLenteComponent } from './factura-producto/producto-lente/producto-lente.component';
import { ProductoArticuloComponent } from './factura-producto/producto-articulo/producto-articulo.component';
import { ProductoLibreComponent } from './factura-producto/producto-libre/producto-libre.component';
// import { ProductoServicioComponent } from './factura-producto/producto-servicio/producto-servicio.component';
import { MatButtonToggleModule } from '@angular/material';
import { ProductoDescuentoComponent } from './factura-producto/producto-descuento/producto-descuento.component';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ClienteSeleccionComponent, ProductoLenteComponent, ProductoArticuloComponent, ProductoLibreComponent, ProductoDescuentoComponent ],
    declarations: [ ClienteSeleccionComponent, FacturaAltaComponent, ProductoLenteComponent, ProductoArticuloComponent, ProductoLibreComponent, ProductoDescuentoComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        FacturaRoutingModule,
        LoadingSpinnerModule,
        MatButtonToggleModule
    ]
})
export class FacturaModule { }
